import React from 'react';
import { Link } from 'react-router-dom';

const SignInPrompt = () => {
  return (
    <div className="w-full p-6 bg-gray-100 rounded-lg shadow-lg text-center max-w-md mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Please Sign In to View Your Plans</h2>
      <p className="mb-4 text-base md:text-lg text-gray-700">
        Sign in to unlock your personalized tasks and plans!
      </p>
      <Link 
        to="/signin" 
        className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-base md:text-lg"
      >
        Sign In
      </Link>
    </div>
  );
};

export default SignInPrompt;

