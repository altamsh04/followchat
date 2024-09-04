import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn'; // Assuming Login.js is in the same directory
import SignUp from './pages/SignUp'; // Assuming SignUp.js is in the same directory

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
