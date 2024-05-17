import React from "react";
import { TextField, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import "./InputField.css";

function InputField(props) {
  const { error, touch, change, blur, value, id, type, label, tooltipData } =
    props;
  return (
    <>
      <TextField
        error={touch && error ? true : false}
        style={{ marginBottom: 8 }}
        onChange={change}
        onBlur={blur}
        value={value}
        id={id}
        type={type}
        variant="standard"
        label={
          touch && error ? (
            <>
              {error}
              {tooltipData && <ToolTip data={tooltipData} />}
            </>
          ) : (
            <>
              {label}
              {tooltipData && <ToolTip data={tooltipData} />}
            </>
          )
        }
      />
    </>
  );
}

export default InputField;

export const ToolTip = (props) => {
  return (
    <Tooltip
      title={
        <div className="tooltip-container">
          <p className="tooltip-text">{props.data.text}</p>
          <ul className="tooltip-items-card">
            {props.data.examples.map((each) => (
              <li className="tooltip-item" key={each}>
                {each}
              </li>
            ))}
          </ul>
        </div>
      }
      placement="bottom-start"
    >
      <InfoOutlinedIcon style={{ fontSize: 18, color: "#767676" }} />
    </Tooltip>
  );
};
