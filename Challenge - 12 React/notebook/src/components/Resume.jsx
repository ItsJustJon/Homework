import React from "react";
// import "./Resume.css";

function Resume() {
  return (
    <section className="resume">
      <h2>Resume</h2>
      <a href="resume.pdf" download>
        Download Resume
      </a>
      <h3>Proficiencies</h3>
      <ul>
        <li>JavaScript</li>
        <li>React</li>
        <li>Node.js</li>
        <li>HTML/CSS</li>
        {/* Add more skills */}
      </ul>
    </section>
  );
}

export default Resume;
