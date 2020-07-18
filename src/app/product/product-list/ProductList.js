import React from "react";
import Product from "./product/Product";

import "./ProductList.css";

function ProductList(props) {
  /**
   * @description This method is responsible for rendering product list.
   * @param {*} product
   */
  const renderProduct = (product) => {
    return (
      <Product
        key={product.id}
        product={product}
        onAddToCart={props.onAddToCart}
      />
    );
  };
  return (
    <div>
      <div className="product-list-container">
        {props.products.map(renderProduct)}
      </div>
    </div>
  );
}

export default ProductList;
