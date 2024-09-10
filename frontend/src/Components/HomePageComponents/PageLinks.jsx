import React from 'react';
import { Link } from 'react-router-dom';

const PageLinks = () => {
  return (
    <div className="w-full p-8 flex flex-col items-center space-y-8">
      <div className="text-center p-6 border rounded-lg shadow-lg bg-beige w-full max-w-md md:max-w-2xl">
        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-orange">Mindfulness</h3>
        <p className="text-base md:text-lg text-gray-700 mb-6">
          Discover tips and practices to improve your mindfulness and productivity.
        </p>
        <Link to="/mindfulness" className="inline-block px-6 py-3 bg-backgroundBtn text-white rounded-lg hover:bg-backgroundBtnCorrect transition-colors duration-300 text-base md:text-lg">
          Go to Mindfulness Page
        </Link>
      </div>

      <div className="text-center p-6 border rounded-lg shadow-lg bg-beige w-full max-w-md md:max-w-2xl">
        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-orange">Task Form</h3>
        <p className="text-base md:text-lg text-gray-700 mb-6">
          Create new tasks and plans to manage your day-to-day activities.
        </p>
        <Link to="/taskform-page" className="inline-block px-6 py-3 bg-backgroundBtn text-white rounded-lg hover:bg-backgroundBtnCorrect transition-colors duration-300 text-base md:text-lg">
          Go to Task Form Page
        </Link>
      </div>

      <div className="text-center p-6 border rounded-lg shadow-lg bg-beige w-full max-w-md md:max-w-2xl">
        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-orange">Chat with AI</h3>
        <p className="text-base md:text-lg text-gray-700 mb-6">
          Get guidance and support from our AI chatbot to achieve your goals.
        </p>
        <Link to="/chat" className="inline-block px-6 py-3 bg-backgroundBtn text-white rounded-lg hover:bg-backgroundBtnCorrect transition-colors duration-300 text-base md:text-lg">
          Go to Chat with AI Page
        </Link>
      </div>
    </div>
  );
};

export default PageLinks;