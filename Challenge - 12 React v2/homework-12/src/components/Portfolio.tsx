import React from 'react';
import proj1img from '../assets/ArrayOfSunshine.png';


const Portfolio: React.FC = () => {
  const projects = [
    { title: 'Array of Sunshine', link: 'https://github.com/p1t0-Group-2/P1T2-Array-of-Sunshine', repo: 'https://github.com/p1t0-Group-2/P1T2-Array-of-Sunshine', pic:{proj1img} },
    { title: 'Project #2 (Coming Soon!)', link: '', repo: '' , pic: ''},
    // Add more projects as needed
  ];

  return (
    <section>
      <h2>Portfolio</h2>
      <div className="projects">
        {projects.map((project, index) => (
          <div key={index} className="project">
            <h3>{project.title}</h3>
            <img src={project.pic}/><br></br>
            <a href={project.link} target="_blank" rel="noopener noreferrer">Deployed Application</a>
            <a href={project.repo} target="_blank" rel="noopener noreferrer">GitHub Repository</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
