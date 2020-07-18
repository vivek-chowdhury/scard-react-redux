import React from "react";
import "./Header.css";
// import { NavLink } from "react-router-dom";
import company from "./../../../logo.svg";

function Header(props) {
  return (
    <nav className="toolbar">
      <div className="left-options">
        <img src={company} alt="Logo" className="logo-image" />
      </div>
      {props.isLoggedIn && (
        <div className="search-container">
          <input
            type="text"
            name="search"
            placeholder="Search.."
            className="input-search"
          ></input>
        </div>
      )}
      {props.isLoggedIn && (
        <div className="right-options">
          <span className="inline-flex-options">
            <span
              className="header-options option-spacing fa fa-shopping-cart fa-2x"
              onClick={props.onShowShoppingCart}
            />
            <span
              className="header-options option-spacing fa fa-sign-out fa-2x"
              onClick={props.onSignOut}
            />
            {/* <NavLink className=" left-buttons navlink-color" to="/">
              Logout
            </NavLink> */}
          </span>
        </div>
      )}
    </nav>
  );
}

export default Header;
