import { Routes, Route } from 'react-router';
import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import WritePost from './components/WritePost';
import Login from './components/Login';
import Register from './components/Register';

// main application for handling page navigation
const App = function App() {
  return (
    <>
      {/* display navbar on every page */}
      <Navbar />

      {/* display the correct page based on URL */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/write" element={<WritePost />} />
      </Routes>
    </>
  );
};

export default App;
