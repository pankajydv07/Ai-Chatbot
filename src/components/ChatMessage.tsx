import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown.css';

interface ChatMessageProps {
  text: string;
  role: 'user' | 'assistant';
  isStreaming?: boolean;
}

export function ChatMessage({ text, role, isStreaming }: ChatMessageProps) {
  return (
    <article 
      className={`relative m-2.5 p-2.5 rounded-lg max-w-[80%] ${
        role === 'user' 
          ? 'bg-[#075985] text-white self-end' 
          : 'bg-[#4B5563] text-white self-start'
      } ${isStreaming ? 'streaming' : ''}`}
    >
      <div className="markdown-body bg-transparent text-inherit">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            // Override default styling for specific elements
            p: ({node, ...props}) => <p className="text-inherit mb-2" {...props} />,
            a: ({node, ...props}) => <a className="text-blue-300 hover:text-blue-200" {...props} />,
            code: ({node, inline, ...props}) => 
              inline 
                ? <code className="bg-black/20 rounded px-1" {...props} />
                : <code className="block bg-black/20 rounded p-2 my-2 overflow-x-auto" {...props} />,
            pre: ({node, ...props}) => <pre className="bg-transparent" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2" {...props} />,
            h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-2" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-2" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-2" {...props} />,
            blockquote: ({node, ...props}) => (
              <blockquote className="border-l-4 border-gray-400 pl-4 italic my-2" {...props} />
            ),
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
      {isStreaming && (
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </article>
  );
}