import * as ProductActions from "./productActionTypes";
import * as ProductService from "./../../../api/ProductService";

/**
 * @description This function is responsible for requesting server to send
 * available product list.
 */
export function loadProducts() {
  return function (dispatch) {
    return ProductService.loadProducts()
      .then((response) => {
        dispatch(onProductLoadedSuccessfully(response));
      })
      .catch((error) => {
        throw error;
      });
  };
}

/**
 * @description This funciton is invoked when application receives list of available products.
 * @param {*} products
 */
export function onProductLoadedSuccessfully(products) {
  return {
    type: ProductActions.PRODUCT_LOADED_SUCCESSFULLY,
    products,
  };
}

/**
 * @description This function is invoked when application failed to load list from server.
 * @param {*} error
 */
export function onProductionLoadFailed(error) {
  return {
    type: ProductActions.PRODUCT_LOADED_SUCCESSFULLY,
    error,
  };
}
