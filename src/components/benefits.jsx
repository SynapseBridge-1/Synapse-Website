import React from "react";
import { Link } from "react-router-dom";
const Benefit = () => {
  return (
    <div id ="home"  className= "py-10 bg-gradient-to-r from-blue-200 via-purple-300  to-blue-400 px-6">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-evenly gap-5">
        {/* Left Section: Text Content */}
        <div className="lg:w-1/2 text-left">
          <h4 className="text-4xl lg:text-4xl font-bold text-purple-800 leading-tight">
          Unlock Your Potential with Synapse Bridge's Innovative AI and App Solutions
          </h4>
          <p className="mt-6 text-lg text-gray-700">
          Choosing Synapse Bridge means leveraging cutting-edge technology tailored to your unique needs. Our expertise in AI, Data Science, and Web and Mobile App Development ensures you stay ahead in a competitive landscape.          </p>
           
        </div>

        {/* Right Section: Image */}
        <div className="lg:w-[75%] mt-10 lg:mt-0 flex justify-center">
          <img
            src="/images/bg-7.webp" // Replace with your rice-related image URL
            alt="Rice Adulteration Detection"
            className="rounded-lg shadow-lg w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Benefit;
