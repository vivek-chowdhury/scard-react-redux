import React from "react";
import CheckBoxFilter from "./checkbox-filter/CheckBoxFilter";
import SliderFilter from "./slider-filter/SliderFilter";

import "./ProductFilter.css";

function ProductFilter(props) {
  return (
    <div className="product-filter-container">
      <CheckBoxFilter
        key="bran-selector"
        filter={props.filters.brandFilters}
        onFilterSelected={props.onFilterSelected}
        onChange={props.onChange}
        title="Brand"
      />
      <CheckBoxFilter
        key="color-selector"
        filter={props.filters.colourFilters}
        onFilterSelected={props.onFilterSelected}
        onChange={props.onChange}
        title="Colour"
      />
      <SliderFilter
        key="price-selector"
        id="price"
        title="Price"
        min={props.filters.priceFilter.min}
        max={props.filters.priceFilter.max}
        step={props.filters.priceFilter.step}
        value={props.filters.priceFilter.selected}
        maxLabel={props.filters.priceFilter.max}
        minLabel={props.filters.priceFilter.min}
        onChange={props.onSliderChanged}
        label="Select Price range"
      />
    </div>
  );
}

export default ProductFilter;
