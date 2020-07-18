import React from "react";
import Slider from "./../../../shared/slider/Slider";
import "./SliderFilter.css";

function SliderFilter(props) {
  const min = 0;
  const max = 100;
  const step = 1;
  return (
    <div className="slider-option-container">
      <h3>Price</h3>
      {/* <Slider
        id={props.id}
        name={props.name}
        min={props.min}
        max={props.max}
        step={props.step}
        label={props.label}
      /> */}
      <div className="slider-card">
        <Slider
          id="price"
          name="price"
          min={min}
          max={max}
          step={step}
          label="Select Price range"
        />
      </div>
    </div>
  );
}

export default SliderFilter;
