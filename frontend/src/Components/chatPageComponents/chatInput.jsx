// src/components/chatPageComponents/ChatInput.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../features/chatSlice';

const ChatInput = () => {
  const [userMessage, setUserMessage] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSend = () => {
    if (userMessage.trim()) {
      dispatch(sendMessage(userMessage))
        .unwrap()
        .then(() => {
          setUserMessage('');
          setError('');
        })
        .catch((err) => {
          setError('Failed to send message. Please try again.');
          console.error('Send message error:', err);
        });
    } else {
      setError('Please enter a message.');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2 p-4 border-t border-lightPink">
      <input
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-2 rounded-lg border border-lightPink focus:outline-none focus:ring-2 focus:ring-orange"
      />
      <button
        onClick={handleSend}
        className="bg-backgroundBtn text-beige px-4 py-2 rounded-lg font-semibold hover:bg-backgroundBtnCorrect"
      >
        Send
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ChatInput;


