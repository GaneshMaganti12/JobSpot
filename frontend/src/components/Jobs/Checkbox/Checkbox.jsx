import React from "react";
import "./Checkbox.css";

function Checkbox(props) {
  const { employmentDetails, handleEmploymentType } = props;

  const onClickEmploymentType = () => {
    handleEmploymentType(employmentDetails.id, employmentDetails.isActive);
  };

  return (
    <li className="employment-list-item" key={employmentDetails.id}>
      <input
        className="employment-input"
        checked={employmentDetails.isActive}
        value={employmentDetails.id}
        onChange={onClickEmploymentType}
        type="checkbox"
        id={employmentDetails.id}
      />
      <label className="employment-label" htmlFor={employmentDetails.id}>
        {employmentDetails.title}
      </label>
    </li>
  );
}

export default Checkbox;
