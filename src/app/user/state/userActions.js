import * as LoginActions from "./userActionTypes";
import * as LoginServices from "../../../api/loginServices";

/**
 * @description This function is responsible for dispatching 'USER_VALIDATED_SUCCESSFULLY'
 * action to reducer.
 * @param {*} response Contains response of server
 */
export function onSuccessfulValidation(response) {
  return { type: LoginActions.USER_VALIDATED_SUCCESSFULLY, response };
}

/**
 * @description This function is responsible for dispatching 'USER_VALIDATION_FAILED'
 * action to reducer.
 * @param {*} response Contains response of server
 */
export function onUserlValidationFailed(error) {
  return { type: LoginActions.USER_VALIDATION_FAILED, error };
}

/**
 * @description This function is responsible for dispatching SIGN_OUT_LOGGEDIN_USER action to reducer.
 */
export function signOutUser() {
  return { type: LoginActions.SIGN_OUT_LOGGEDIN_USER };
}

/**
 * @description This function is responsible for dispatching REMEMBER_ME action to reducer.
 */
export function toggleRememberMe(isRemembered) {
  return { type: LoginActions.REMEMBER_ME, rememberMe: isRemembered };
}

/**
 * @description This function is invoked when Login component start validating user credentials.
 * This function make use of middleware (thunk) to hit Rest API which will validate user credential and
 * return response accordingly.
 *
 * @param {*} user Contains user credential
 */
export function validateUser(user) {
  return function (dispatch) {
    return LoginServices.validateUser(user.username, user.password)
      .then((response) => {
        if (response && response.length > 0) {
          dispatch(onSuccessfulValidation(response[0]));
          return response;
        } else {
          const error = { message: "Invalid User", code: "404" };
          dispatch(onUserlValidationFailed(error));
          return error;
        }
      })
      .catch((error) => {
        throw error;
      });
  };
}
