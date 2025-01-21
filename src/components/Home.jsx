// components/Home.jsx
import React from 'react';
import HeroSection from './hero';
import ServicesSection from './services';
import ContactSection from './c';
import MissionVisionSection from './misvision';
import Benefit from './benefits';
import SoftwareProcessesSection from './softwareprocesses';
const Home = () => {
  return (
    <div className='h-full'>
      <HeroSection />
      <SoftwareProcessesSection />
      <MissionVisionSection />
      <div id="servicesSection">
        <ServicesSection />
      </div>
      <Benefit />
      {/* <ProjectSlider /> */}
      <ContactSection />
    </div>
  );
};

export default Home;
