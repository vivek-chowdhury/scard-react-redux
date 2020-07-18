import * as Actions from "./headerActionTypes";

const initialState = {
  searchBy: "",
};

/**
 *@description This function is responsible for returning new state as per the 
 action. It takes previous state and the action as parameter and return new header state.
  
 * @param {*} state
 * @param {*} action
 */
export default function headerReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.SEARCH_PRODUCT_BY:
      return { searchBy: action.key };
    default:
      return state;
  }
}
