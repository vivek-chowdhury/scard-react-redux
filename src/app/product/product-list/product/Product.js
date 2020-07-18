import React from "react";
import "./Product.css";

function Product(props) {
  return (
    <div className="item-container">
      <div className="discount">
        {props.product.discount !== 0 && (
          <span className="discount-value">
            Discount {props.product.discount}%
          </span>
        )}
      </div>
      <div className="img-container">
        <img src={props.product.image} alt="Item" />
      </div>
      <div className="description-container">
        <div className="title">{props.product.title}</div>
        <div className="item-description">
          <span className="description-heading">Brand</span>
          <div className="item-info brand">
            <span>{props.product.brand}</span>
          </div>
        </div>

        <div className="item-description">
          <span className="description-heading">Price</span>
          <div className="item-info">
            {props.product.price.mrp && (
              <span className="mrp-price price">
                <s>{props.product.price.mrp}</s>
              </span>
            )}
            <span className="final-price price">
              {props.product.price.final_price}
            </span>
          </div>
        </div>

        <div className="item-description">
          <span className="description-heading">Rating</span>
          <div className="item-info">
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
          </div>
        </div>

        <div className="item-description">
          <span className="description-heading">Color</span>
          <div className="item-info">
            <div
              className="color-box"
              style={{ backgroundColor: props.product.colour.color }}
            ></div>
          </div>
        </div>
      </div>
      <input
        type="button"
        value="Add to Cart"
        className="add-to-cart btn btn-primary"
        onClick={(event) => {
          props.onAddToCart(event, props.product);
        }}
      />
    </div>
  );
}

export default React.memo(Product);
