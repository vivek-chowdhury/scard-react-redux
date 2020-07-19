import { handleError, handleResponse } from "./serviceUtils";
const baseUri = process.env.REACT_APP_API_URL;
const productUri = baseUri + "/products";
const filtersUri = baseUri + "/filters";

/**
 * @description This function is responsible for fetching list of products from server.
 */
export function loadProducts() {
  return fetch(productUri).then(handleResponse).catch(handleError);
}

/**
 * @description This function is responsible for fetching list of filters from server.
 */
export function loadFilters() {
  return fetch(filtersUri).then(handleResponse).catch(handleError);
}

/**
 * @description This function is responsible for fetching product as per the search string.
 */
export function searchProduct(searchKey) {
  const url = `${productUri}?title=${searchKey}`;
  return fetch(url).then(handleResponse).catch(handleError);
}
