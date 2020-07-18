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
        <div className="top-label-container">
          <span>Min</span>
          <span className="right-label">Max</span>
        </div>

        <input
          type="range"
          id={props.id}
          name={props.name}
          min={props.min}
          max={props.max}
          value={props.value}
          step={step}
          onChange={props.onChange}
        ></input>
        <div className="bottom-label-container">
          <span>{props.minLabel}</span>
          <span className="right-label">{props.maxLabel}</span>
        </div>
      </div>
    </div>
  );
}

Slider.propType = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  minLabel: PropTypes.string.isRequired,
  maxLabel: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number,
};
export default Slider;
