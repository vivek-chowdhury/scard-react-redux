import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import LoginForm from "./login-form/LoginForm";
import { toggleRememberMe, validateUser } from "./state/userActions";
import { toggleSpinner } from "./../appAction";

import "./UserLogin.css";

function UserLogin(props) {
  // Contains user state
  const [user, setUser] = useState(props.user);

  //Contains error state
  const [error, setError] = useState("");

  //Contains true if fields are not empty else contain false
  const [isFieldEmpty, setIsFieldEmpty] = useState(true);

  /**
   * @description This method is responsible for checking user detail and if store already has
   * information of previous logged in user then it will pre-populate credentials if
   * user is logged out else navigate user to products screen if user is validated.
   */
  useEffect(() => {
    if (props.user.isLoggedIn) {
      props.history.push("/products");
    }
    if (props.user.error !== "") {
      updateErrorMessage();
    }
  }, [props.history, props.user, props]);

  /**
   * @description This method is responsible for displaying error message
   * if somehow user failed to validate.
   */
  const updateErrorMessage = () => {
    setError("Invalid User name or Password, please try again !");
  };

  /**
   * @description This method is invoked when user start updating login form for validation.
   * It is responsible for updating member variable which application will use for valiation.
   *
   * @param {Element} param Contains reference of target element.
   */
  const handleFieldModified = ({ target }) => {
    setUser({
      ...user,
      [target.name]:
        target.name !== "rememberMe" ? target.value : target.checked,
    });
    if (target.name === "rememberMe") {
      props.toggleRememberMe(target.checked);
    }
    const required = user.username === "" && user.password === "";
    setIsFieldEmpty(required);
  };

  /**
   * @description This method is invoked when user clicks on the submit button,
   * it is responsible for validating user credential by sending user id &
   * password to server for validation.
   * @param {*} event Contains reference of event.
   */
  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.toggleSpinner(true);
    props.validateUser(user).then((response) => {
      if (response && response.message) {
        props.toggleSpinner(false);
      }
    });
  };

  return (
    <div className="login-container">
      <div className="card">
        <LoginForm
          {...user}
          error={error}
          isFieldEmpty={isFieldEmpty}
          onChange={handleFieldModified}
          onSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
}

/**
 * @description This method retrieve slice of state from store
 * @param {*} state
 */
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

/**
 * @description This object contains all the actions which Component require to notify reducer for
 * any change.
 */
const mapDispatchToProps = {
  toggleRememberMe,
  validateUser,
  toggleSpinner,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
