import React from 'react';
import "../assets/css/about.css"
const AboutSection = () => {
  return (
    <section
      className="relative bg-blue-100 text-blue-900 py-20"
      style={{ backgroundImage: "url('../../images/back.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div> {/* Overlay */}
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">About Us</h2>
          <p className="text-lg mt-2 text-white">Discover Synapse Bridge and our commitment to exceptional design and technology</p>
        </div>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/3 px-4 mb-8 cursor-pointer flex">
            <div className="bg-white p-6 rounded-lg shadow-lg touch-effect flex-grow flex flex-col">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg flex-grow">
                At Synapse Bridge, we blend well-established design methodologies with cutting-edge technology. Our mission is to empower businesses through innovative solutions, specializing in web development, Android development, and AI/ML applications.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8 cursor-pointer flex">
            <div className="bg-white p-6 rounded-lg shadow-lg touch-effect flex-grow flex flex-col">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg flex-grow">
                We envision a world where technology seamlessly integrates with everyday life, enhancing productivity and fostering innovation. Our team remains at the forefront of technological advancements to ensure our clients benefit from the best solutions available.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8 cursor-pointer flex">
            <div className="bg-white p-6 rounded-lg shadow-lg touch-effect flex-grow flex flex-col">
              <h3 className="text-2xl font-bold mb-4">Our Team</h3>
              <p className="text-lg flex-grow">
                Our team comprises passionate professionals dedicated to delivering excellence in every project. With a focus on good user experience and a blue color scheme, we create solutions that not only meet but exceed our clients' expectations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
