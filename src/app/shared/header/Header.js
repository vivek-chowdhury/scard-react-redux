import React, { useState } from "react";
import { connect } from "react-redux";

import useDebounce from "./../custom-hooks/useDebounce";
import { searchProductBy } from "./headerAction";
import "./Header.css";
// import { NavLink } from "react-router-dom";
import company from "./../../../logo.svg";

function Header(props) {
  //Contain search key entered by user
  const [searchKey, setSearchKey] = useState("");
  /**
   * @description This method is invoked when user try to search product from search bar.
   * @param {*} event
   */
  useDebounce(
    (value) => {
      props.searchProductBy(value);
    },
    searchKey,
    500
  );

  return (
    <nav className="toolbar">
      <div className="left-options">
        <span className="inline-flex-options">
          <img src={company} alt="Logo" className="logo-image" />
          {props.user.fullName !== "" && (
            <label className="align-text">{props.user.fullName}</label>
          )}
        </span>
      </div>
      {props.isLoggedIn && (
        <div className="search-container">
          <input
            type="text"
            name="search"
            placeholder="Search.."
            className="input-search"
            onChange={(event) => {
              setSearchKey(event.target.value);
            }}
          ></input>
        </div>
      )}
      {props.isLoggedIn && (
        <div className="right-options">
          <span className="inline-flex-options">
            <span
              className="header-options option-spacing fa fa-shopping-cart fa-2x"
              onClick={props.onShowShoppingCart}
            >
              {props.market.cart.length > 0 && (
                <span className="badge">{props.market.cart.length}</span>
              )}
            </span>

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

/**
 * @description This method retrieve slice of state from store
 * @param {*} state
 */
function mapStateToProps(state) {
  return {
    app: state.app,
    market: state.market,
    user: state.user,
  };
}

/**
 * @description This object contains all the actions which Component require to notify reducer for
 * any change.
 */
const mapDispatchToProps = {
  searchProductBy,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
