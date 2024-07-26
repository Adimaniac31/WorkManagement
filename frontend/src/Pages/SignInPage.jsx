import React from 'react';
import signUpImage from '../assets/signup-image.webp'; // Ensure the image is correctly imported

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center p-4 bg-gray-200">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center p-4">
        <img 
          src={signUpImage} 
          alt="Sign Up" 
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center p-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Sign Up</h2>
        <form className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="characterName">
              User Name
            </label>
            <input
              type="text"
              id="characterName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter user name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password" // Changed type to "password" for security
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="feelings">
              Share something about yourself
            </label>
            <textarea
              id="feelings"
              className="shadow appearance-none border rounded h-24 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="How are you feeling today? Or you can tell what you want to accomplish or anything you wish to."
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-orange hover:bg-darkPink text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;