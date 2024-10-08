import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, setCharName, setPassword } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import signInImage from '../assets/signup-image.webp';
import { Link } from 'react-router-dom';

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Use navigate hook
  const { charName, password, status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(signIn({ charName, password }));
    
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/');  // Redirect to home on successful sign-in
    }
  };

  const errorMessage = JSON.stringify(error?.error);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center p-4 bg-gray-200">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center p-4">
        <img
          src={signInImage}
          alt="Sign In"
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center p-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Sign In</h2>
        <form className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="userName">
              User Name
            </label>
            <input
              type="text"
              id="userName"
              value={charName}
              onChange={(e) => dispatch(setCharName(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter user name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter password"
            />
          </div>
          <div className="flex items-center justify-center gap-2 w-full">
            <button
              type="submit"
              className="bg-orange hover:bg-darkPink text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </div>
          <div className="flex items-center flex-col justify-start gap-2">
            Do not have an account?
            <Link to="/signup">
              <button
                className="bg-orange hover:bg-darkPink text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign Up
              </button>
            </Link>
          </div>
          {status === 'loading' && <p>Loading...</p>}
          {status === 'failed' && (
            <p className="bg-red-100 text-red-800 border border-red-400 rounded-md p-4 mt-4">
              Error: {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignInPage;