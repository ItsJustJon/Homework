import React from "react";
// import "./Portfolio.css";

function Portfolio() {
  const projects = [
    {
      title: "Project 1",
      deployedLink: "https://project1.com",
      githubLink: "https://github.com/project1",
      image: "project1.jpg",
    },
    {
      title: "Project 2",
      deployedLink: "https://project2.com",
      githubLink: "https://github.com/project2",
      image: "project2.jpg",
    },
    // Add more projects as necessary
  ];

  return (
    <section className="portfolio">
      <h2>Portfolio</h2>
      <div className="portfolio-grid">
        {projects.map((project, index) => (
          <div className="portfolio-item" key={index}>
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <a href={project.deployedLink} target="_blank" rel="noopener noreferrer">Deployed App</a>
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Portfolio;
