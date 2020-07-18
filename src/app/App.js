import React, { lazy, Suspense } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Spinner from "./shared/spinner/Spinner";
import Header from "./shared/header/Header";
import { signOutUser } from "./user/state/userActions";

// Lazy loading
const UserLogin = lazy(() => import("./user/UserLogin"));
const ProductShell = lazy(() => import("./product/ProductShell"));

function App(props) {
  /**
   * @description This method is responsible for handling sign out request, it will
   * responsible for notifying store about sign out and navigating user to logn screen.
   *
   * @param {*} event
   */
  const handleSignOut = (event) => {
    console.log(props);
    // event.preventDefault();
    if (props.user.isLoggedIn) {
      props.signOutUser();
    }
    props.history.push("/");
  };

  /**
   * @description This mehtod is responsible for handling show shopping cart request,
   * it will navigate user to shopping cart screen.
   *
   * @param {*} event
   */
  const handleShowShoppingCart = (event) => {
    // event.preventDefault();
  };

  return (
    <React.Fragment>
      <ToastContainer autoClose={3000} hideProgressBar />
      <div className="App">
        <Header
          isLoggedIn={props.user.isLoggedIn}
          onSignOut={handleSignOut}
          onShowShoppingCart={handleShowShoppingCart}
        />
        <div className="route-container">
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route path="/" exact component={UserLogin} />
              <Route path="/products" component={ProductShell} />
            </Switch>
          </Suspense>
        </div>
        <Spinner stayHidden={props.app.stayHidden} />
      </div>
    </React.Fragment>
  );
}

/**
 * @description This function is responsible for fetching specific slice
 * of state from store.
 *
 * @param {*} state
 */
function mapStateToProps(state) {
  return {
    user: state.user,
    app: state.app,
  };
}

/**
 * @description This object contains all the actions which Component require to notify reducer for
 * any change.
 */
const mapDispatchToProps = {
  signOutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
