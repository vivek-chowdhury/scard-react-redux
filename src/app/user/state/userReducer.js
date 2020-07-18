import * as Actions from "./userActionTypes";

// Contains initial state
const initalState = {
  username: "",
  password: "",
  fullName: "",
  isLoggedIn: false,
  rememberMe: false,
  error: "",
};

/**
 *@description This function is responsible for returning new state as per the 
 action. It takes previous state and action which need to perform on the state.
  
 * @param {*} state
 * @param {*} action
 */
export default function userReducer(state = initalState, action) {
  switch (action.type) {
    case Actions.USER_VALIDATED_SUCCESSFULLY:
      return {
        ...state,
        ...action.response,
        isLoggedIn: true,
      };
    case Actions.USER_VALIDATION_FAILED:
      return {
        ...state,
        error: action.error.message,
        isLoggedIn: false,
      };
    case Actions.REMEMBER_ME:
      return {
        ...state,
        rememberMe: action.rememberMe,
      };
    case Actions.SIGN_OUT_LOGGEDIN_USER:
      return state.rememberMe ? { ...state, isLoggedIn: false } : initalState;
    default:
      return state;
  }
}
