import React from "react";
import FormInput from "../../shared/form-input/FormInput";
import CheckBox from "../../shared/check-box/CheckBox";
import "./LoginForm.css";

function LoginForm(props) {
  const required = true;

  return (
    <form className="form-horizontal" onSubmit={props.onSubmit}>
      {props.error && <div className="alert alert-danger">{props.error}</div>}
      <FormInput
        inputId="username"
        inputType="text"
        inputValue={props.username}
        onTextChange={props.onChange}
        inputPlaceholder="Enter user id"
        inputLabel="User id :"
        required={required}
      ></FormInput>

      <FormInput
        inputId="password"
        inputType="password"
        inputValue={props.password}
        onTextChange={props.onChange}
        inputPlaceholder="Enter password"
        inputLabel="Password :"
        required={required}
      ></FormInput>
      <div className="action-container">
        <input
          type="submit"
          value="Save"
          className="btn btn-primary"
          disabled={props.isFieldEmpty}
        />
        <CheckBox
          className="check-box"
          id="rememberMe"
          name="rememberMe"
          onChange={props.onChange}
          checked={props.rememberMe}
          label="Remember me"
        />
      </div>
    </form>
  );
}

export default LoginForm;
