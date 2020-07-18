import React from "react";
import PropTypes from "prop-types";
import "./CheckBox.css";

function CheckBox(props) {
  return (
    <React.Fragment>
      <label htmlFor={props.id}>
        <input
          type="checkbox"
          id={props.id}
          name={props.name}
          checked={props.checked}
          onChange={(event) => {
            props.onChange(event, props.data);
          }}
          onClick={(event) => {
            if (props.onClick) {
              const data = props.data || props;
              props.onClick(data, event);
            }
          }}
        />
        {props.label}
      </label>
    </React.Fragment>
  );
}

CheckBox.propType = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  data: PropTypes.object,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

export default CheckBox;
