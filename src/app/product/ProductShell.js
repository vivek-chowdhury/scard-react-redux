import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import ProductFilter from "./product-filter/ProductFilter";
import ProductList from "./product-list/ProductList";
import { toggleSpinner } from "./../appAction";
import { loadProducts } from "./state/productActions";
import {
  updateBrandFilter,
  updateColourFilter,
} from "./state/productFilterActions";
import "./ProductShell.css";

function ProductShell(props) {
  //Contains true if Component started fetching required data from server
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  //Contaisn product filter list
  const [filteredProducts, setFilteredProducts] = useState(props.products);

  const [colorFilter, setColorFilter] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);

  /**
   * @description This method is responsible for loading product list and once list is
   * downloaded it will remove spinner from screen.
   */
  const populateInformation = useCallback(() => {
    props.loadProducts().then((response) => {
      props.toggleSpinner(false);
    });
  }, [props]);

  /**
   * @description This method is responsible for filtering products based on color filters
   * @param {*} list
   * @param {*} target
   */
  const hasColourSelected = (list, target) => {
    return list.find((item) => {
      return item.value === target.colour.title.toUpperCase();
    });
  };

  /**
   * @description This method is responsible for filtering products based on brand filters
   * @param {*} list
   * @param {*} target
   */
  const hasBrandSelected = (list, target) => {
    return list.find((item) => {
      return item.value === target.brand.toUpperCase();
    });
  };
  /**
   * @description This method is responsible for executing user selected filters on product list.
   */
  const executeFilters = useCallback(() => {
    let fresList = [];
    if (brandFilter.length > 0) {
      fresList = props.products.filter((product) => {
        return hasBrandSelected(brandFilter, product);
      });
    }
    if (colorFilter.length > 0) {
      const sourceList = fresList.length > 0 ? fresList : props.products;
      fresList = sourceList.filter((product) => {
        return hasColourSelected(colorFilter, product);
      });
    }
    const finalList =
      brandFilter.length > 0 || colorFilter.length > 0
        ? fresList
        : props.products;
    setFilteredProducts(finalList);
  }, [brandFilter, colorFilter, props.products]);

  /**
   * @description This method is responsible for checking whether user is logged in or
   * not and if user is logged in then it will start fetching product list else navigate
   * user to login screen.
   */
  useEffect(() => {
    if (props.user.isLoggedIn && !isLoadingProducts) {
      setIsLoadingProducts(true);
      populateInformation();
    }
    if (!props.user.isLoggedIn) {
      props.history.push("/");
    }

    executeFilters();
  }, [
    executeFilters,
    isLoadingProducts,
    populateInformation,
    props,
    props.user,
  ]);

  /**
   * @description This method is invoked when user selects filters from filter section.
   *
   * @param {*} event
   */
  const handleFilterSelected = (option, event) => {
    if (option.type === "brand") {
      props.updateBrandFilter({ ...option, checked: !option.checked });
      if (!option.checked) {
        setBrandFilter([...brandFilter, option]);
      } else {
        setBrandFilter(
          brandFilter.filter((item) => {
            return item.key !== option.key;
          })
        );
      }
    } else {
      props.updateColourFilter({ ...option, checked: !option.checked });
      if (!option.checked) {
        setColorFilter([...colorFilter, option]);
      } else {
        setColorFilter(
          colorFilter.filter((item) => {
            return item.key !== option.key;
          })
        );
      }
    }
  };

  const handleCheckboxOnChange = (event, option) => {};

  return (
    <div className="product-shell">
      <ProductFilter
        filters={props.filters}
        onFilterSelected={handleFilterSelected}
        onChange={handleCheckboxOnChange}
        className="left-section"
      />
      <ProductList products={filteredProducts} className="right-section" />
    </div>
  );
}

/**
 * @description This method retrieve slice of state from store
 * @param {*} state
 */
function mapStateToProps(state) {
  return {
    user: state.user,
    app: state.app,
    products: state.products,
    filters: state.filters,
  };
}

/**
 * @description This object contains all the actions which Component require to notify reducer for
 * any change.
 */
const mapDispatchToProps = {
  toggleSpinner,
  loadProducts,
  updateBrandFilter,
  updateColourFilter,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductShell);
