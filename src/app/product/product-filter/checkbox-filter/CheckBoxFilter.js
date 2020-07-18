import React from "react";
import "./CheckBoxFilter.css";
import CheckBox from "./../../../shared/check-box/CheckBox";

function CheckBoxFilter(props) {
  /**
   * @description This method is responsible for rendering filter option.
   * @param {*} option
   */
  const renderOptions = (option) => {
    return (
      <CheckBox
        key={option.key}
        id={option.key}
        label={option.value}
        data={option}
        onClick={props.onFilterSelected}
        checked={option.checked}
        onChange={props.onChange}
      />
    );
  };
  return (
    <div className="filter-option-container">
      <h3>{props.title}</h3>
      <div className="filter-card">{props.filter.map(renderOptions)}</div>
    </div>
  );
}

export default CheckBoxFilter;
