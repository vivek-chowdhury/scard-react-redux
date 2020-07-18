import React from "react";
import { connect } from "react-redux";
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
      {!props.isLoggedIn && (
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

function mapStateToProps(state) {
  return {
    app: state.app,
    market: state.market,
  };
}

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
