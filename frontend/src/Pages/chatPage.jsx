// src/pages/ChatPage.jsx
import React from 'react';
import ChatInput from '../Components/chatPageComponents/chatInput';
import ChatDisplay from '../Components/chatPageComponents/chatDisplay';

const ChatPage = () => (
  <div className="flex flex-col h-screen bg-background text-textPrimary">
    <header className="bg-orange text-beige p-4">
      <h1 className="text-2xl font-bold">Chat with AI</h1>
    </header>
    <main className="flex-1 flex flex-col">
      <ChatDisplay />
      <ChatInput />
    </main>
  </div>
);

export default ChatPage;


