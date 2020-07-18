import React from "react";
import PropTypes from "prop-types";
import "./Slider.css";

function Slider(props) {
  const step = props.step ? props.step : 1;
  return (
    <div className="slider-control-container">
      <label htmlFor={props.id} className="slider-label">
        {props.label}
      </label>
      <div className="slider-control-field">
        <span className="min-position">Min</span>
        <span className="max-position">Max</span>
        <input
          type="range"
          id={props.id}
          name={props.name}
          min={props.min}
          max={props.max}
          step={step}
        ></input>
      </div>
    </div>
  );
}

Slider.propType = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number,
};
export default Slider;
