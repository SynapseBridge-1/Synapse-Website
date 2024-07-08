import React from "react";
import ProjectsSection from "./projects";
import AboutSection from "./aboutSection";
const About = () => {
    return (
      <div>
        {/* About Section */}
        <AboutSection />
        <div id="projectsSection">
        <ProjectsSection/>
        </div>
      </div>
    );
  };
  export default About;