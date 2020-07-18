import * as Actions from "./headerActionTypes";

/**
 * @description This function is responsible for notifying product component to filter product list.
 * @param {*} key
 */
export function searchProductBy(key) {
  return { type: Actions.SEARCH_PRODUCT_BY, key };
}
