import React from 'react';

const MissionVisionSection = () => {
  return (
    // <section className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
    <section  className="relative bg-blue-100 text-blue-900 py-16"
    style={{ backgroundImage: "url('/images/back.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-gray-700 opacity-65"></div> {/* Overlay */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 ml-4">Our Mission</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              At Synapse Bridge, we blend well-established design methodologies with cutting-edge technology. 
              Our mission is to empower businesses through innovative solutions, specializing in web development, 
              Android development, and AI/ML applications.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 ml-4">Our Vision</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              We envision a world where technology seamlessly integrates with everyday life, 
              enhancing productivity and fostering innovation. Our team remains at the forefront 
              of technological advancements to ensure our clients benefit from the best solutions available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;