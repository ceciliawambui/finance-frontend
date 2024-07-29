import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex justify-between">
        <li><Link to="/" className="text-white">Home</Link></li>
        <li><Link to="/register" className="text-white">Register</Link></li>
        <li><Link to="/login" className="text-white">Login</Link></li>
        <li><Link to="/dashboard" className="text-white">Dashboard</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
