import React from "react";
import Product from "./product/Product";

import "./ProductList.css";

function ProductList({ products }) {
  /**
   * @description This method is responsible for rendering product list.
   * @param {*} product
   */
  const renderProduct = (product) => {
    return <Product key={product.id} {...product} />;
  };
  return (
    <div>
      {/* {console.log(products)} */}
      <div className="product-list-container">
        {products.map(renderProduct)}
      </div>
    </div>
  );
}

export default ProductList;
