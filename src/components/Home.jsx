// components/Home.jsx
import React from 'react';
import HeroSection from './hero';
import ServicesSection from './services';

const Home = () => {
  return (
    <div className='h-full'>
      <HeroSection />
      <div id="servicesSection">
        <ServicesSection />
      </div>
    </div>
  );
};

export default Home;
