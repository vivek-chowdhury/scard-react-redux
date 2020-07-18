import * as Actions from "./appActionTypes";

/**
 * @description This function is responsible for dispatching SIGN_OUT_LOGGEDIN_USER action to reducer.
 */
export function toggleSpinner(isRequired) {
  return { type: Actions.TOGGLE_APPLICATON_SPINNER, stayHidden: !isRequired };
}
