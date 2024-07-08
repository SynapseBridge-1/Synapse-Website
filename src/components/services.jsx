import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import {
  FaGlobe,
  FaLaptopCode,
  FaRobot,
  FaBrain,
  FaCog,
  FaDatabase,
  FaChartLine,
  FaFlask,
} from "react-icons/fa";
import "../assets/hero.css";

const ServicesSection = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const basePath = "http://localhost:3000";
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${basePath}/api/services`);
        setServices(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchServices();
  }, []);

  // Mapping icons to services (you can adjust this as needed)
  const icons = {
    "Web Development": (
      <FaGlobe className="inline-block mr-2 text-5xl web-animated-icon animated-icon" />
    ),
    "Android Development": (
      <FaLaptopCode className="inline-block mr-2 text-5xl animated-icon android-animated-icon" />
    ),
    "Data Analytics": (
      <FaChartLine className="inline-block mr-2 text-5xl da-animated-icon animated-icon" />
    ),
    Databases: (
      <FaDatabase className="inline-block mr-2 text-5xl db-animated-icon animated-icon" />
    ),
    "AI Development": (
      <FaRobot className="inline-block mr-2 text-5xl ai-animated-icon animated-icon" />
    ),
    "ML Development": (
      <FaBrain className="inline-block mr-2 text-5xl ml-animated-icon animated-icon" />
    ),
    "Data Science": (
      <FaFlask className="inline-block mr-2 text-5xl ds-animated-icon animated-icon" />
    ),
  };

  const colours = {
    "Web Development": "text-green-600 ",
    "Android Development": "text-lime-500 ",
    "AI Development": "text-red-400 ",
    "ML Development": "text-yellow-400 ",
    "Data Analytics": "text-indigo-800 ",
    "Data Science": "text-orange-800 ",
    "Databases": "text-teal-400 ",
    
  };

  return (
    <section className="serviceSection bg-sky-50 text-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-blue-600 md:text-4xl font-bold">
            Our Services
          </h2>
          <p className="text-lg mt-2">Discover what we can do for you</p>
        </div>
        <div className="flex flex-wrap -mx-4">
          {services.map((service) => (
            <div key={uuidv4()} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <div className="service-card bg-white shadow-md rounded-xl p-6 flex flex-col justify-start gap-4 ">
                {/* Fixed height for medium and larger screens */}
                <div className={`icon text-center ${colours[service.name]}`}>
                  {icons[service.name] || (
                    <FaCog className="inline-block mr-2 text-5xl" />
                  )}
                </div>
                <h3 className={`text-center text-xl ${colours[service.name]} font-bold mb-2`}>
                  {service.name}
                </h3>
                <p className="text-lg text-center grow-1 ">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
