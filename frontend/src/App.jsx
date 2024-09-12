import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './Pages/SignUpPage';
import SignInPage from './Pages/SignInPage';
import TaskFormPage from './Pages/TaskFormPage';
import ChatPage from './Pages/chatPage';
import HomePage from './Pages/HomePage';
import Navbar from './Components/Common/NavBar';
import MindfulnessPage from './Pages/MindfulnessPage';

const App = () => {
  useEffect(() => {
    // This will trigger when the tab or window is closed
    window.onunload = function () {
      localStorage.clear(); // Clear the localStorage when the tab is closed
    };
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/taskform-page" element={<TaskFormPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/mindfulness" element={<MindfulnessPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;