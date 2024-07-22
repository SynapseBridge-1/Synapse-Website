import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(false);
  
  const LOCAL_STORAGE_KEY = 'projects';
  const LAST_UPDATED_KEY = 'lastUpdated';
  const FRESHNESS_THRESHOLD = 10 * 60 * 1000; // 10 minutes in milliseconds

  useEffect(() => {
    
    const basePath = import.meta.env.VITE_backendURL;
    // const port=import.meta.env.VITE_PORT;
    const fetchProjects = async (storedData) => {
      try {
        // const lastUpdated = localStorage.getItem(LAST_UPDATED_KEY);
        
        const response = await axios.get(`${basePath}/api/projects`);
       
        
        // Update state and local storage
        if(response.status === 200)
        {
          setProjects(response.data);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response.data));
          localStorage.setItem(LAST_UPDATED_KEY, new Date().toISOString()); // Store as ISO string
        }
        else if(response.status === 204)
        {
 setProjects(storedData);
        }
      } catch (error) {
        setError(true);
      }
    };

    const loadProjects = () => {
      const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      const lastUpdated = localStorage.getItem(LAST_UPDATED_KEY);
      const currentTime = Date.now();

      // Check if local storage is empty
      if (!storedData || !lastUpdated) {
        fetchProjects(); // Fetch from server if local storage is empty
      } else {
        const lastUpdatedTimestamp = new Date(lastUpdated).getTime();
        const isDataFresh = storedData && (currentTime - lastUpdatedTimestamp < FRESHNESS_THRESHOLD);

        if (isDataFresh) {
          setProjects(storedData); // Use local storage data
        } else {
          fetchProjects(storedData); // Fetch from server if data is stale
        }
      }
    };

    loadProjects();
  }, []);

  return (
    <section className="bg-zinc-200 text-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-blue-600 md:text-4xl font-bold">Our Projects</h2>
          <p className="text-lg mt-2">Take a look at some of our recent work</p>
        </div>
        {error && (
          <div className="text-center text-lg font-semibold m-4 p-2 text-red-500">
            Cannot load projects at this time
            <p className='text-center'>reload page</p>
          </div>
        )}
        {projects.length > 0 ? (
          <div className="flex flex-col items-center gap-4 justify-center sm:flex-wrap -mx-4">
            {projects.map((project) => (
              <div key={uuidv4()} className="w-full md:w-2/3 lg:w-1/2 px-4 mb-8">
                <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col justify-between h-full transition transform hover:scale-105">
                  <div>
                    <img
                      src={`data:${project.mimeType};base64,${project.imageData}`}
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
        ) : (
          !error && <div className='text-center font-medium m-4 p-2'>No projects found</div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
