import React from 'react';
import { Link } from 'react-router-dom';

const PageLinks = () => {
  return (
    <div className="w-full p-4 flex flex-col items-center space-y-6">
      <div className="text-center p-4 border rounded-lg shadow-lg bg-white w-full max-w-md">
        <h3 className="text-xl font-semibold mb-2">Mindfulness</h3>
        <p className="text-gray-700 mb-4">
          Discover tips and practices to improve your mindfulness and productivity.
        </p>
        <Link to="/mindfulness" className="text-blue-500 underline">
          Go to Mindfulness Page
        </Link>
      </div>

      <div className="text-center p-4 border rounded-lg shadow-lg bg-white w-full max-w-md">
        <h3 className="text-xl font-semibold mb-2">Task Form</h3>
        <p className="text-gray-700 mb-4">
          Create new tasks and plans to manage your day-to-day activities.
        </p>
        <Link to="/taskform-page" className="text-blue-500 underline">
          Go to Task Form Page
        </Link>
      </div>

      <div className="text-center p-4 border rounded-lg shadow-lg bg-white w-full max-w-md">
        <h3 className="text-xl font-semibold mb-2">Chat with AI</h3>
        <p className="text-gray-700 mb-4">
          Get guidance and support from our AI chatbot to achieve your goals.
        </p>
        <Link to="/chat" className="text-blue-500 underline">
          Go to Chat with AI Page
        </Link>
      </div>
    </div>
  );
};

export default PageLinks;

