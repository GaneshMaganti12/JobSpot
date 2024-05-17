import React from "react";
import "./Radio.css";

function Radio(props) {
  const { salaryDetails, handleSalaryType } = props;

  const onClickSalaryType = (e) => {
    handleSalaryType(e.target.value);
  };

  return (
    <li className="salary-list-item" key={salaryDetails.id}>
      <input
        className="salary-input"
        onClick={onClickSalaryType}
        value={salaryDetails.id}
        type="radio"
        name="salary"
        id={salaryDetails.id}
      />
      <label className="salary-label" htmlFor={salaryDetails.id}>
        {salaryDetails.title}
      </label>
    </li>
  );
}

export default Radio;
