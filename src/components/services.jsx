
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
  FaCloud,
  FaLock,
  FaNetworkWired,
  FaServer,
  FaPalette,
  FaCode,
  FaTerminal,
  FaLaptop,
  FaCodeBranch,
} from "react-icons/fa";
import "../assets/css/hero.css";
const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    // const basePath = "http://localhost:3000";
    const basePath = process.env.VITE_backendURL;

    const fetchServices = async () => {
      try {
        const response = await axios.get(`${basePath}/api/services`);
        setServices(response.data);
      
      } catch (error) {
        
        setError(true);
      }
    };

    fetchServices();
  }, []);

  const cleanString = (inputString) => {
    // Remove spaces and non-alphabetic characters using regular expressions
    let cleaned = inputString.replace(/\s+/g, '').replace(/[^a-zA-Z]/g, '');
    // Convert all alphabetic characters to lowercase
    cleaned = cleaned.toLowerCase();
    return cleaned;
  };

  const icons = {
    "webdevelopment": <FaGlobe className="inline-block mr-2 text-5xl rot-animated-icon animated-icon" />,
    "androiddevelopment": <FaLaptopCode className="inline-block mr-2 text-5xl animated-icon flip-animated-icon" />,
    "dataanalytics": <FaChartLine className="inline-block mr-2 text-5xl zoom-animated-icon animated-icon" />,
    "databases": <FaDatabase className="inline-block mr-2 text-5xl bounce-animated-icon animated-icon" />,
    "aidevelopment": <FaRobot className="inline-block mr-2 text-5xl zoom-animated-icon animated-icon" />,
    "mldevelopment": <FaBrain className="inline-block mr-2 text-5xl flip-animated-icon animated-icon" />,
    "datascience": <FaFlask className="inline-block mr-2 text-5xl shake-animated-icon animated-icon" />,
    "cloudcomputing": <FaCloud className="inline-block mr-2 text-5xl zoom-animated-icon animated-icon"/>,
    "networking": <FaNetworkWired className="inline-block mr-2 text-5xl zoom-animated-icon animated-icon"/>,
     "security": <FaLock className="inline-block mr-2 text-5xl bounce-animated-icon animated-icon"/>,
     "devops": <FaServer className="inline-block mr-2 text-5xl shake-animated-icon animated-icon"/>,
     "uiux": <FaPalette className="inline-block mr-2 text-5xl flip-animated-icon animated-icon"/>, 
  };

  const fallbackIcons = [
  
    <FaCode className="inline-block mr-2 text-5xl flip-animated-icon animated-icon " />,
    <FaCog className="inline-block mr-2 text-5xl rot-animated-icon animated-icon" />,
    <FaTerminal className="inline-block mr-2 text-5xl zoom-animated-icon animated-icon" />,
    <FaLaptop className="inline-block mr-2 text-5xl rot-animated-icon animated-icon" />,
    <FaCodeBranch className="inline-block mr-2 text-5xl rot-animated-icon animated-icon" />,
  ];

  const fallbackIconsColor = [
  
    " text-lime-500 ",
    " text-blue-700 ",
    "text-green-600 ",
    " text-red-400 ",
    "text-indigo-800 ",
    "text-orange-800 ",
    "text-teal-400 ",
  ];

  const colours = {
    "webdevelopment": "text-green-600 ",
    "androiddevelopment": "text-lime-500 ",
    "aidevelopment": "text-red-400 ",
    "mldevelopment": "text-yellow-400 ",
    "dataanalytics": "text-indigo-800 ",
    "datascience": "text-orange-800 ",
    "databases": "text-teal-400 ",
  };

  const getRandomFallbackIcon = () => {
    const randomIndex = Math.floor(Math.random() * fallbackIcons.length);
    return fallbackIcons[randomIndex];
  };

  const getRandomFallbackIconColor = () => {
    const randomIndex = Math.floor(Math.random() * fallbackIconsColor.length);
    return fallbackIconsColor[randomIndex];
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
        {error && (
          <div className="text-center text-lg font-semibold m-4 p-2 text-red-500">
            Cannot load services at this time
          </div>
        )}
        { services.length>0 ?( <div className="flex flex-wrap -mx-4">
          {services.map((service) => {
            let cleanedServiceName = cleanString(service.name);
            let icon = icons[cleanedServiceName];
            let color = colours[cleanedServiceName];
            if (!icon) {
              icon = getRandomFallbackIcon();
            }
            if (!color)
            {
              color = getRandomFallbackIconColor();
            }

            return (
              <div key={uuidv4()} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <div className="service-card bg-white shadow-md rounded-xl p-6 flex flex-col justify-start gap-4 ">
                  <div className={`icon text-center ${color}`}>
                    {icon}
                  </div>
                  <h3 className={`text-center text-xl ${color} font-bold mb-2`}>
                    {service.name}
                  </h3>
                  <p className="text-lg text-center grow-1 ">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>): ( !error && <div className='text-center font-medium m-4 p-2'>No services found</div>)}
      </div>
    </section>
  );
};

export default ServicesSection;
