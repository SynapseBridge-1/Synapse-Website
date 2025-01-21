export const scrolldetect = () => {
    document.addEventListener("scroll", () => {
        const sections = document.querySelectorAll(".animated-section");
        const windowHeight = window.innerHeight;
      
        sections.forEach((section) => {
          const sectionTop = section.getBoundingClientRect().top;
          if (sectionTop < windowHeight - 100) { // Adjust threshold as needed
            section.classList.add("translate-x-0", "opacity-100","delay-200");
          }
        });
      });
}