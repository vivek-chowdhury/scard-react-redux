import * as ActionTypes from "./productActionTypes";

const initialState = {
  products: [],
  cart: [],
};

/**
 * @description This function is responsible for updating cart list
 * @param {*} option
 * @param {*} cartList
 */
function updateCartList(option, cartList) {
  const index = cartList.findIndex((item) => {
    return item.id === option.id;
  });
  const match =
    index > -1 ? { ...cartList[index] } : { ...option, quantity: 0 };
  match.quantity += 1;
  if (index < 0) {
    return [...cartList, match];
  } else {
    return Object.assign([...cartList], { [index]: match });
  }
}

/**
 *@description This function is responsible for returning new state as per the 
 action. It takes previous state and the action as parameter and return new product state.
  
 * @param {*} state
 * @param {*} action
 */
export default function productReducers(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.PRODUCT_LOADED_SUCCESSFULLY:
      return {
        ...state,
        products: [...action.products],
      };
    case ActionTypes.PRODUCT_LOAD_FAILED:
      return {
        ...state,
        products: [],
      };
    case ActionTypes.UPDATE_ADD_TO_CART:
      return {
        ...state,
        cart: updateCartList(action.product, state.cart),
      };
    default:
      return state;
  }
}
