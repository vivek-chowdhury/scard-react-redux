import { handleError, handleResponse } from "./serviceUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/products";

/**
 * @description This function is responsible for fetching list of products from server.
 */
export function loadProducts() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
