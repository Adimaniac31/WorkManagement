import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut as signOutAction, deleteUser as deleteUserAction } from '../../features/authSlice'; // Adjust import path

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = () => {
    dispatch(signOutAction());
    navigate('/signin');
  };

  const handleDeleteUser = async () => {
    if (userId) {
      try {
        await dispatch(deleteUserAction(userId)).unwrap();
        setIsConfirmDeleteOpen(false); // Close dialog after successful deletion
        navigate('/signup'); // Redirect to signup page after user deletion
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const confirmDeleteUser = () => {
    setIsConfirmDeleteOpen(true);
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">SkillPlanner</Link>
        </div>

        {/* Links for Desktop */}
        <ul className="hidden md:flex space-x-6 text-white">
          <li>
            <Link to="/" className="hover:text-yellow-400">Home</Link>
          </li>
          <li>
            <Link to="/signup" className="hover:text-yellow-400">Sign Up</Link>
          </li>
          <li>
            <Link to="/signin" className="hover:text-yellow-400">Sign In</Link>
          </li>
          <li>
            <Link to="/taskform-page" className="hover:text-yellow-400">Tasks</Link>
          </li>
          <li>
            <Link to="/chat" className="hover:text-yellow-400">Chat</Link>
          </li>
          <li>
            <Link to="/mindfulness" className="hover:text-yellow-400">Mindfulness</Link>
          </li>
          <li>
            <button onClick={handleSignOut} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
              Sign Out
            </button>
          </li>
          {userId && (
            <li>
              <button onClick={confirmDeleteUser} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
                Delete Account
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="md:hidden flex flex-col bg-gray-800 text-white space-y-4 mt-4 px-4">
          <li>
            <Link to="/" className="hover:text-yellow-400" onClick={toggleMobileMenu}>Home</Link>
          </li>
          <li>
            <Link to="/signup" className="hover:text-yellow-400" onClick={toggleMobileMenu}>Sign Up</Link>
          </li>
          <li>
            <Link to="/signin" className="hover:text-yellow-400" onClick={toggleMobileMenu}>Sign In</Link>
          </li>
          <li>
            <Link to="/taskform-page" className="hover:text-yellow-400" onClick={toggleMobileMenu}>Tasks</Link>
          </li>
          <li>
            <Link to="/chat" className="hover:text-yellow-400" onClick={toggleMobileMenu}>Chat</Link>
          </li>
          <li>
            <Link to="/mindfulness" className="hover:text-yellow-400" onClick={toggleMobileMenu}>Mindfulness</Link>
          </li>
          <li>
            <button onClick={() => { handleSignOut(); toggleMobileMenu(); }} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
              Sign Out
            </button>
          </li>
          {userId && (
            <li>
              <button onClick={() => { confirmDeleteUser(); toggleMobileMenu(); }} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
                Delete Account
              </button>
            </li>
          )}
        </ul>
      )}

      {/* Confirmation Dialog for User Deletion */}
      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
            <button onClick={handleDeleteUser} className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 mr-2">
              Delete
            </button>
            <button onClick={handleCancelDelete} className="bg-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


