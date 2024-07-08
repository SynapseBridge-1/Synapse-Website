export const scrollToProjects = () =>{
const projectsSection = document.getElementById("projectsSection");
if (projectsSection)
    {
        projectsSection.scrollIntoView({behavior:"smooth"});
    }

}