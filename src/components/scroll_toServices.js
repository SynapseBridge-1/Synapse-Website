// scrollToServices.js
export const scrollToServices = () => {
    const servicesSection = document.getElementById('servicesSection');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  