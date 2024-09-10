import React from 'react';
import { Link } from 'react-router-dom';

const SignInPrompt = () => {
  return (
    <div className="w-full p-6 bg-gray-100 rounded-lg shadow-lg text-center">
      <h2 className="text-3xl font-bold mb-6">Please Sign In to View Your Plans</h2>
      <p className="mb-4 text-lg">
        Sign in to unlock your personalized tasks and plans!
      </p>
      <Link to="/signin" className="inline-block px-8 py-3 bg-backgroundBtn text-white rounded-lg hover:bg-backgroundBtnCorrect transition duration-300">
        Sign In
      </Link>
    </div>
  );
};

export default SignInPrompt;
