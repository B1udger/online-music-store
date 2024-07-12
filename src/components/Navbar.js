import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Online Music Store</Link>
        <div>
          <Link to="/" className="text-white px-4">Home</Link>
          <Link to="/cart" className="text-white px-4">Cart</Link>
          <Link to="/profile" className="text-white px-4">Profile</Link>
          <Link to="/login" className="text-white px-4">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
