import * as FilterActions from "./productFilterActionTypes";
import * as ProductService from "./../../../api/productService";

/**
 * This method is responsible for requesting reducer to update filter informaton
 * @param {*} filters
 */
export function filtersLoadedScuccessfully(filters) {
  return { type: FilterActions.FILTER_LOADED_SUCCESSFULLY, filters };
}

/**
 * This method is responsible for requesting reducer to update error informaton
 * @param {*} filters
 */
export function filterLoadFailed(error) {
  return { type: FilterActions.FILTERS_FAILED_TO_LOAD, error };
}

/**
 * This method is responsible for requesting reducer to update brand filter list
 * @param {*} option
 */
export function updateBrandFilter(option) {
  return { type: FilterActions.UPDATE_BRAND_FILTER_OPTION, brand: option };
}

/**
 * This method is responsible for requesting reducer to update colour filter list
 * @param {*} option
 */
export function updateColourFilter(option) {
  return { type: FilterActions.UPDATE_COLOUR_FILTER_OPTION, colour: option };
}

/**
 * This method is responsible for requesting reducer to update price filter list
 * @param {*} value
 */
export function updatePriceFilter(value) {
  return { type: FilterActions.UPDATE_PRICE_FILTER_OPTION, value };
}

/**
 * @description This function is responsible for loading filters from server.
 *
 */
export function loadFilters() {
  return function (dispatch) {
    return ProductService.loadFilters()
      .then((response) => {
        dispatch(filtersLoadedScuccessfully(response));
      })
      .catch((error) => {
        debugger;
        dispatch(filterLoadFailed(error));
      });
  };
}
