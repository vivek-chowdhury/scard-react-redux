import * as ActionTypes from "./productActionTypes";
import * as FilterActions from "./productFilterActionTypes";

const initialState = {
  brandFilters: [],
  colourFilters: [],
  priceFilter: {
    min: 0,
    max: 100,
    step: 1,
    selected: 100,
  },
  discountFilter: {
    min: 0,
    max: 100,
    step: 1,
    selected: 0,
  },
};

/**
 * @description This function is responsible for returning filter object
 * @param {*} value
 */
function getFilterObject(value, type) {
  return { value: value, type, checked: false, key: value.replace(/\s/g, "") };
}

/**
 * @description This function is responsible for setting price filter initial values.
 * @param {*} products
 */
function getPriceRange(products) {
  const price = {
    min: 1000000,
    max: 100,
    step: 1,
    selected: 100,
  };
  products.map((product) => {
    if (product.price.final_price < price.min) {
      price.min = product.price.final_price;
    }
    if (price.max < product.price.final_price) {
      price.max = product.price.final_price;
    }
    return product;
  });
  price.step = Math.floor(Math.sqrt(price.max));
  price.selected = price.max;
  return price;
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
 * @description This function is responsible for retrieving colour filter from avaiable filter list.
 * @param {*} filters
 */
function getColorFilters(filters) {
  const colourFilterObject = relevantFilterObject(filters, "COLOUR");
  const filter = colourFilterObject.values;
  const finalList = [];
  filter.map((rule) => {
    finalList.push(getFilterObject(rule.title.toUpperCase(), "colour"));
    return rule;
  });
  return finalList;
}

/**
 * @description This function is responsible for slicing required filter from list
 * @param {*} filters
 * @param {*} type
 */
function relevantFilterObject(filters, type) {
  return filters.find((filter) => {
    return filter.type === type;
  });
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
 action. It takes previous state and the action as parameter and return new filter state.
  
 * @param {*} state
 * @param {*} action
 */
export default function productFilterReducers(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.PRODUCT_LOADED_SUCCESSFULLY:
      return {
        ...state,
        brandFilters: getBranchFilter(action.products),
        // colourFilters: getColourFilter(action.products),
        priceFilter: getPriceRange(action.products),
      };
    case FilterActions.FILTER_LOADED_SUCCESSFULLY:
      return {
        ...state,
        colourFilters: getColorFilters(action.filters),
        // priceFilter: getPriceRange(action.products),
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
    case FilterActions.UPDATE_PRICE_FILTER_OPTION:
      return {
        ...state,
        priceFilter: { ...state.priceFilter, selected: action.value },
      };
    case ActionTypes.PRODUCT_LOAD_FAILED:
      return initialState;
    default:
      return state;
  }
}
