import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const basePath = 'http://localhost:3000';
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${basePath}/api/projects`);
        setProjects(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="bg-zinc-200 text-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Our Projects</h2>
          <p className="text-lg mt-2">Take a look at some of our recent work</p>
        </div>
        <div className="flex flex-col items-center gap-4 justify-center sm:flex-wrap -mx-4">
          {projects.map((project) => (
            <div key={uuidv4()} className="w-full md:w-2/3 lg:w-1/2 px-4 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col justify-between h-full transition transform hover:scale-105">
                <div>
                  <img
                    src={project.imagePath}
                    alt={project.name}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  <p className="text-lg font-sans text-blue-900">{project.description}</p>
                </div>
               
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
