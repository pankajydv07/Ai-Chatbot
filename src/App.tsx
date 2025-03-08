import React, { useRef, useEffect, useState } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { openai, initialMessages } from './lib/openai';
import { functions } from './lib/tools';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [streamingContent, setStreamingContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const conversationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

  const scrollToBottom = () => {
    if (conversationRef.current) {
      conversationRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const handleSubmit = async (query: string) => {
    const newMessages = [...messages, { role: 'user', content: query }];
    setMessages(newMessages);
    setIsStreaming(true);
    setStreamingContent('');

    try {
      const runner = openai.beta.chat.completions.runFunctions({
        model: "gpt-4o",
        messages: newMessages,
        functions,
        stream: true,
      });

      let accumulatedContent = '';
      
      for await (const chunk of runner) {
        if (chunk.choices[0]?.delta?.content) {
          accumulatedContent += chunk.choices[0].delta.content;
          setStreamingContent(accumulatedContent);
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: accumulatedContent }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsStreaming(false);
      setStreamingContent('');
    }
  };

  return (
    <div className="min-h-screen bg-[#1F2937] flex justify-center items-center">
      <main className="bg-whitesmoke m-4 p-4 min-h-[calc(100vh-2rem)] w-full max-w-4xl rounded-2xl flex flex-col justify-between">
        <section className="flex flex-col mb-8 overflow-y-auto flex-grow" ref={conversationRef}>
          <ChatMessage text="Hi there! How may I help you?" role="assistant" />
          {messages.filter(m => m.role !== 'system').map((message, index) => (
            <ChatMessage
              key={index}
              text={message.content}
              role={message.role as 'user' | 'assistant'}
            />
          ))}
          {isStreaming && streamingContent && (
            <ChatMessage
              text={streamingContent}
              role="assistant"
              isStreaming={true}
            />
          )}
        </section>
        <ChatInput onSubmit={handleSubmit} />
      </main>
    </div>
  );
}

export default App;