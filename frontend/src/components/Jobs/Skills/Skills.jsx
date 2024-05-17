import React from "react";
import "./Skills.css";

function Skills(props) {
  const { skillsDetails } = props;

  return (
    <li className="skills-item">
      <img
        className="skill-image"
        src={skillsDetails.imageUrl}
        alt={skillsDetails.name}
      />
      <p className="skill-name">{skillsDetails.name}</p>
    </li>
  );
}

export default Skills;
