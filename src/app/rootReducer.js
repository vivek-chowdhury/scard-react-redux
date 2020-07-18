import { combineReducers } from "redux";
import userReducer from "./user/state/userReducer";
import productReducers from "./product/state/productReducers";
import productFilterReducers from "./product/state/productFilterReducer";
import headerReducer from "./shared/header/headerReducer";
import * as ActionTypes from "./appActionTypes";

const initalState = {
  stayHidden: true,
};
/**
 *@description This function is responsible for returning new state as per the 
 action. It takes previous state and the action as parameter and return new root state.
  
 * @param {*} state
 * @param {*} action
 */
export function appReducer(state = initalState, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_APPLICATON_SPINNER:
      return {
        ...state,
        stayHidden: action.stayHidden,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
  market: productReducers,
  filters: productFilterReducers,
  header: headerReducer,
});
export default rootReducer;
