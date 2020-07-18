import React from "react";
import CheckBoxFilter from "./checkbox-filter/CheckBoxFilter";

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
    </div>
  );
}

export default ProductFilter;
