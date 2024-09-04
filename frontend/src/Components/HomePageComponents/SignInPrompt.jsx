import React from 'react';
import { Link } from 'react-router-dom';

const SignInPrompt = () => {
  return (
    <div className="w-full p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Please Sign In to View Your Plans</h2>
      <Link to="/signin" className="text-blue-500 underline">
        Sign In
      </Link>
    </div>
  );
};

export default SignInPrompt;