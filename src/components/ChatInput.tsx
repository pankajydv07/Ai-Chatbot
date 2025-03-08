import React, { FormEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSubmit: (message: string) => void;
}

export function ChatInput({ onSubmit }: ChatInputProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const message = formData.get('user-input') as string;
    if (message.trim()) {
      onSubmit(message);
      form.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        name="user-input"
        placeholder="Type message here..."
        className="w-full bg-transparent border border-[#16202C] rounded-l-2xl p-4 text-[#111827]"
        required
      />
      <button 
        type="submit"
        className="bg-transparent border border-l-0 border-[#16202C] rounded-r-2xl p-4"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
}