import React from 'react';
import headshot from '../assets/Headshot.jpg';

const AboutMe: React.FC = () => {
  return (
    <section>
      <h2>About Me</h2>
      <img src={headshot} alt="Developer Headshot" />
      <p>I have spent the last fifteen years working in a variety of industries and have improved business performance with every role that I have undertaken, either through business process improvement, automated reporting, or software development with the Microsoft Office suite (Visual Basic for Applications). I now am concurrently a  computer programming student who aims to develop bespoke software for companies as part of a broader business consulting and automation partner.</p>
    </section>
  );
};

export default AboutMe;