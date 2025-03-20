import React from 'react';

const Resume: React.FC = () => {
  const proficiencies = ['Visual Basic', 'SQL', 'Javascript', 'ChapGPT'];

  return (
    <section>
      <h2>Resume</h2>
      <a href="https://www.linkedin.com/in/jonathanhummer/details/featured/" download>More About Me</a>
      <h3>Proficiencies</h3>
      <ul>
        {proficiencies.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
  );
};

export default Resume;
