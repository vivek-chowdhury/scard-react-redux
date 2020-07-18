import * as ActionTypes from "./productActionTypes";
import * as FilterActions from "./productFilterActionTypes";

const initialState = {
  brandFilters: [],
  colourFilters: [],
};

/**
 * @description This function is responsible for returning filter object
 * @param {*} value
 */
function getFilterObject(value, type) {
  return { value: value, type, checked: false, key: value.replace(/\s/g, "") };
}

/**
 * @description This function is responsible for retrieving branch filter from avaiable product list.
 * @param {*} products
 * @return array
 */
function getBranchFilter(products) {
  const filter = [];
  const finalFilter = [];
  products.map((product) => {
    const brand = product.brand.toUpperCase();
    if (filter.indexOf(brand) === -1) {
      filter.push(brand);
      finalFilter.push(getFilterObject(brand, "brand"));
    }
    return brand;
  });
  return finalFilter;
}

/**
 * @description This function is responsible for retrieving colour filter from avaiable product list.
 * @param {*} products
 * @return array
 */
function getColourFilter(products) {
  const filter = [];
  const finalFilter = [];
  products.map((product) => {
    const color = product.colour.title.toUpperCase();
    if (filter.indexOf(color) === -1) {
      filter.push(color);
      finalFilter.push(getFilterObject(color, "colour"));
    }
    return color;
  });
  return finalFilter;
}

/**
 * This function is responsible for updating filter options state.
 * @param {*} filter
 * @param {*} option
 */
function updateFilterOption(filter, option) {
  const list = [...filter];
  list.forEach((value, index) => {
    if (value.key === option.key) {
      list[index] = { ...option };
    }
  });
  return [...list];
}

/**
 *@description This function is responsible for returning new state as per the 
 action. It takes previous state and action which need to perform on the state.
  
 * @param {*} state
 * @param {*} action
 */
export default function productFilterReducers(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.PRODUCT_LOADED_SUCCESSFULLY:
      return {
        ...state,
        brandFilters: getBranchFilter(action.products),
        colourFilters: getColourFilter(action.products),
      };
    case FilterActions.UPDATE_BRAND_FILTER_OPTION:
      return {
        ...state,
        brandFilters: updateFilterOption(state.brandFilters, action.brand),
      };
    case FilterActions.UPDATE_COLOUR_FILTER_OPTION:
      return {
        ...state,
        colourFilters: updateFilterOption(state.colourFilters, action.colour),
      };
    case ActionTypes.PRODUCT_LOAD_FAILED:
      return initialState;
    default:
      return state;
  }
}
