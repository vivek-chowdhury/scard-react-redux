import React from "react";
import "./Spinner.css";

function Spinner(props) {
  return (
    <React.Fragment>
      {!props.stayHidden && (
        <div className="spinnerContainer">
          <div className="loader">Loading...</div>
        </div>
      )}
    </React.Fragment>
  );
}
export default Spinner;
