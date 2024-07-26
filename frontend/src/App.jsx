// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './Pages/SignUpPage';
import SignInPage from './Pages/SignInPage';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

