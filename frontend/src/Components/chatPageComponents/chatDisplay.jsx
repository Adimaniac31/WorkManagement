// src/components/chatPageComponents/ChatDisplay.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const ChatDisplay = () => {
  const { messages, error } = useSelector((state) => state.chats);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {error && <p className="text-red-500">Error loading messages: {error}</p>}
      {messages.length === 0 && !error && <p>No messages yet. Start the conversation!</p>}
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
        >
          <div
            className={`inline-block p-2 rounded-lg ${
              msg.role === 'user' ? 'bg-backgroundBtn text-beige' : 'bg-lightPink text-textPrimary'
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatDisplay;


