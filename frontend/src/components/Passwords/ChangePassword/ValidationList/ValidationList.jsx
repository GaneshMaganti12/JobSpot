import React from "react";
import { FaCircle } from "react-icons/fa";
import "./ValidationList.css";

function ValidationList(props) {
  const { validation } = props;
  return (
    <div className="valid-card">
      <div className="valid">
        <FaCircle
          className="circle-icon"
          style={{
            color: validation.upper ? "#228822" : "#a9a8a8",
          }}
        />
        <p
          style={{
            textDecoration: validation.upper ? "line-through" : "none",
            color: validation.upper ? "#228822" : "#a9a8a8",
          }}
        >
          At least one upper case character
        </p>
      </div>
      <div className="valid">
        <FaCircle
          className="circle-icon"
          style={{
            color: validation.lower ? "#228822" : "#a9a8a8",
          }}
        />
        <p
          style={{
            textDecoration: validation.lower ? "line-through" : "none",
            color: validation.lower ? "#228822" : "#a9a8a8",
          }}
        >
          At least one lower case character
        </p>
      </div>
      <div className="valid">
        <FaCircle
          className="circle-icon"
          style={{
            color: validation.number ? "#228822" : "#a9a8a8",
          }}
        />
        <p
          style={{
            textDecoration: validation.number ? "line-through" : "none",
            color: validation.number ? "#228822" : "#a9a8a8",
          }}
        >
          At least one number
        </p>
      </div>
      <div className="valid">
        <FaCircle
          className="circle-icon"
          style={{
            color: validation.special ? "#228822" : "#a9a8a8",
          }}
        />
        <p
          style={{
            textDecoration: validation.special ? "line-through" : "none",
            color: validation.special ? "#228822" : "#a9a8a8",
          }}
        >
          At least one special character
        </p>
      </div>
    </div>
  );
}

export default ValidationList;
