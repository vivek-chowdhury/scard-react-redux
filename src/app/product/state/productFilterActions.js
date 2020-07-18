import * as FilterActions from "./productFilterActionTypes";

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
