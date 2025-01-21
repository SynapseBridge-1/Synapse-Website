import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/header.css'; // Ensure your CSS file path is correct
import { useNavigate } from 'react-router-dom';
import { scrollToContact } from './scrolltoContact';
import { scrollToServices } from './scroll_toServices';
const Header = () => {
  const navigate = useNavigate();
  const handleClickContact = () => {
    setIsMenuOpen(false);
    navigate('/');
    scrollToContact();
  }

  const handleClickServices = () => { 
    setIsMenuOpen(false);
    navigate('/');
    scrollToServices();
  }


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 relative">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/images/logo2.png"
            alt="Synapse Bridge Logo"
            className="h-16 w-auto mx-2 border border-black rounded-full"
            style={{ maxHeight: '4rem' }} // Adjust the max height of the image
          />
          <span className="font-bold text-lg">Synapse Bridge</span>
        </div>

        {/* Hamburger Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* Menu */}
        <nav className={`  nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link
            to="/"
            className="text-gray-300 hover:text-white hover:border-b-2 border-green-50 hover:text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <button
            className="text-gray-300 hover:text-white hover:border-b-2 border-green-50 hover:text-lg"
            onClick={handleClickServices}
          >
            Services
          </button>
          
          <button
            className="text-gray-300 hover:text-white hover:border-b-2 border-green-50 hover:text-lg"
            onClick={handleClickContact}
            >
            Contact
            </button>
          
        </nav>
      </div>
    </header>
  );
};

export default Header;
