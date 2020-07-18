import React from "react";
import "./Product.css";

function Product(props) {
  return (
    <div className="item-container">
      <div className="discount">
        {props.discount !== 0 && (
          <span className="discount-value">Discount {props.discount}%</span>
        )}
      </div>
      <div className="img-container">
        <img src={props.image} alt="Item" />
      </div>
      <div className="description-container">
        <div className="title">{props.title}</div>
        <div className="item-description">
          <span className="description-heading">Brand</span>
          <div className="item-info brand">
            <span>{props.brand}</span>
          </div>
        </div>

        <div className="item-description">
          <span className="description-heading">Price</span>
          <div className="item-info">
            {props.price.mrp && (
              <span className="mrp-price price">
                <s>{props.price.mrp}</s>
              </span>
            )}
            <span className="final-price price">{props.price.final_price}</span>
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
              style={{ backgroundColor: props.colour.color }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
