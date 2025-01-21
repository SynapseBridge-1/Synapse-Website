import React from "react";

const SoftwareProcessesSection = () => {
  return (
    <div className="py-16 px-6 bg-blue-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">
          Software Processes & Quality Assurance
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Process Section */}
          <div className="p-6 bg-gradient-to-b from-white to-gray-100 rounded-lg shadow-lg border border-gray-300">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">
              Our Software Processes
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              At Synapse Bridge, we follow industry-standard software development
              practices to ensure the highest quality deliverables. Our processes
              include:
            </p>
            <ul className="list-disc ml-6 mt-4 text-gray-700">
              <li>Agile methodology for adaptability and transparency.</li>
              <li>Well-defined requirement analysis and planning.</li>
              <li>Rigorous testing cycles, including unit and integration tests.</li>
              <li>Continuous Integration/Continuous Deployment (CI/CD).</li>
            </ul>
          </div>

          {/* Quality Assurance Section */}
          <div className="p-6 bg-gradient-to-b from-white to-gray-100 rounded-lg shadow-lg border border-gray-300">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">
              Quality Assurance
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Quality is at the core of everything we do. Our QA team ensures:
            </p>
            <ul className="list-disc ml-6 mt-4 text-gray-700">
              <li>Thorough testing across all stages of development.</li>
              <li>Compliance with international standards and best practices.</li>
              <li>Security, performance, and usability testing for optimal outcomes.</li>
              <li>Continuous monitoring and improvement to deliver excellence.</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600">
            Partner with us for reliable and innovative solutions backed by proven
            processes and unmatched quality assurance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SoftwareProcessesSection;
