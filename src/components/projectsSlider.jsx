import React, { useState } from 'react';

const projects = [
  {
    id: 1,
    image: "/images/bg-1.png", // Replace with your image URL
    name: "Book Breeze",
    description: "sdg",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/300",
    name: "Project Two",
    description: "Description for project two.",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/300",
    name: "Project Three",
    description: "Description for project three.",
  },
];

const ProjectSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {projects.map((project) => (
          <div key={project.id} className="min-w-full flex-shrink-0 p-4">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
            <h3 className="mt-4 text-xl font-semibold text-center">
              {project.name}
            </h3>
            <p className="mt-2 text-sm text-gray-600 text-center">
              {project.description}
            </p>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
      >
        ❯
      </button>
    </div>
  );
};

export default ProjectSlider;
