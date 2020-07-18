import React from "react";
import Slider from "./../../../shared/slider/Slider";
import "./SliderFilter.css";

function SliderFilter(props) {
  return (
    <div className="slider-option-container">
      <h3>{props.title}</h3>
      <div className="slider-card">
        <Slider
          id={props.id}
          name={props.id}
          min={props.min}
          max={props.max}
          step={props.step}
          maxLabel={props.maxLabel}
          minLabel={props.minLabel}
          label={props.label}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}

export default SliderFilter;
