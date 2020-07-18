import * as ActionTypes from "./productActionTypes";

/**
 *@description This function is responsible for returning new state as per the 
 action. It takes previous state and action which need to perform on the state.
  
 * @param {*} state
 * @param {*} action
 */
export default function productReducers(state = [], action) {
  switch (action.type) {
    case ActionTypes.PRODUCT_LOADED_SUCCESSFULLY:
      return [...action.products];
    //   case ActionTypes.PRODUCT_LOAD_FAILED:
    //   return {
    //     ...state,
    //     ...action.products,
    //   };
    default:
      return state;
  }
}
