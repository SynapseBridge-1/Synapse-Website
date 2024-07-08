// components/HeroSection.jsx
import React from 'react';
// import TypingAnimation from './animate';
// import Typewriter from './animate';
import '../assets/hero.css'; // Import custom CSS for HeroSection
import { scrollToServices } from './scroll_toServices';
const HeroSection = () => {
  // const handleScroll = () => {
  //   const servicesSection = document.getElementById('servicesSection');
  //   if (servicesSection) {
  //     servicesSection.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };
  const typingText = "Empowering Your Business Through Technology"; // Text for typewriter animation
  return (
    <section className="heroSection text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          <span className="text-gradient">Welcome to Synapse Bridge</span>
        </h1>
        {/* <p className="text-lg  md:text-xl lg:text-2xl mb-8">Empowering Your Business Through Technology</p> */}
        <p className="text-lg md:text-xl lg:text-2xl mb-8">
         {/* <Typewriter texts={typingText}/> */}
         {typingText}
        </p>
        <button onClick={scrollToServices} className="hero-button hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-200 font-semibold py-4 px-6 rounded-xl cursor-pointer outline-none hover:font-bold">
          Explore Services
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
