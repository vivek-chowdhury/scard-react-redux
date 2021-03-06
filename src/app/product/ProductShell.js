import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import ProductFilter from "./product-filter/ProductFilter";
import ProductList from "./product-list/ProductList";
import { toggleSpinner } from "./../appAction";
import {
  loadProducts,
  updateAddToCart,
  searchProducts,
} from "./state/productActions";
import {
  updateBrandFilter,
  updateColourFilter,
  updatePriceFilter,
  loadFilters,
} from "./state/productFilterActions";
import "./ProductShell.css";

import useDebounce from "./../shared/custom-hooks/useDebounce";

function ProductShell(props) {
  //Contains true if Component started fetching required data from server
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  //Contaisn product filter list
  const [filteredProducts, setFilteredProducts] = useState(
    props.market.products
  );

  //Contains list of colour filter applied to product list
  const [colorFilter, setColorFilter] = useState([]);

  //Contains list of brand filter applied to product list
  const [brandFilter, setBrandFilter] = useState([]);

  const [totalCartItems, setTotalCartItems] = useState(0);

  //Contains true if item is added
  const [isItemAddingToCart, setItemAddingToCart] = useState(false);

  //Contains selected price filter
  const [price, setPrice] = useState(props.filters.priceFilter.selected);

  const [searchByText, setSearchByText] = useState(props.header.searchBy);

  /**
   * @description This function is responsible for fetching product list
   */
  const fetchProductLis = useCallback(() => {
    props.loadProducts().then((response) => {
      props.toggleSpinner(false);
    });
  }, [props]);

  /**
   * @description This method is responsible for loading product list and filter list, once list is
   * downloaded it will remove spinner from screen.
   */
  const populateInformation = useCallback(() => {
    if (props.user.isLoggedIn && !isLoadingProducts) {
      setIsLoadingProducts(true);
      props.loadFilters();
      fetchProductLis();
    }
    if (
      searchByText !== props.header.searchBy &&
      props.header.searchBy !== ""
    ) {
      setSearchByText(props.header.searchBy);
      props.searchProducts(props.header.searchBy);
    } else if (
      searchByText !== props.header.searchBy &&
      props.header.searchBy === ""
    ) {
      setSearchByText(props.header.searchBy);
      fetchProductLis();
    }
  }, [fetchProductLis, isLoadingProducts, props, searchByText]);

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
      const branchSource =
        fresList.length > 0 ? fresList : props.market.products;
      fresList = branchSource.filter((product) => {
        return hasBrandSelected(brandFilter, product);
      });
    }
    if (colorFilter.length > 0) {
      const sourceList = fresList.length > 0 ? fresList : props.market.products;
      fresList = sourceList.filter((product) => {
        return hasColourSelected(colorFilter, product);
      });
    }

    const priceList = fresList.length > 0 ? fresList : props.market.products;
    fresList = priceList.filter((product) => {
      return product.price.final_price <= props.filters.priceFilter.selected;
    });
    setFilteredProducts(fresList);
  }, [brandFilter, colorFilter, props]);

  /**
   * @description This function is responsible for displaying toast notification when item
   * is added to cart or quanity is updated to already existing cart.
   */
  const notifyWhenAdded = useCallback(() => {
    if (
      props.market.cart &&
      props.market.cart.length > totalCartItems &&
      isItemAddingToCart
    ) {
      setItemAddingToCart(false);
      toast.success("Item added to cart successfully !");
    } else if (isItemAddingToCart) {
      setItemAddingToCart(false);
      toast.success("Quantity is added to alrady existing item successfully !");
    }
    setTotalCartItems(props.market.cart.length);
  }, [isItemAddingToCart, props.market.cart, totalCartItems]);

  /**
   * @description This method is responsible for checking whether user is logged in or
   * not and if user is logged in then it will start fetching product list else navigate
   * user to login screen.
   */
  useEffect(() => {
    if (!props.user.isLoggedIn) {
      props.history.push("/");
    }

    populateInformation();
    executeFilters();
    notifyWhenAdded();
  }, [executeFilters, notifyWhenAdded, populateInformation, props, props.user]);

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

  /**
   * @description This method is invoked when user adds any product to cart
   * @param {*} event
   * @param {*} option
   */
  const handleAddToCartRequest = (event, option) => {
    setItemAddingToCart(true);
    props.updateAddToCart(option);
  };

  /**
   * @description This method will invoke when user change price filter using slider.
   * @param {*} event
   */
  const handleSliderChange = (event) => {
    setPrice(event.target.value);
  };

  /**
   * @description This method will wait for 100 mili seconds before sending
   * notification to reducer.
   */
  useDebounce(
    (value) => {
      props.updatePriceFilter(value);
    },
    price,
    50
  );

  return (
    <div className="product-shell">
      <ProductFilter
        filters={props.filters}
        onFilterSelected={handleFilterSelected}
        onChange={handleCheckboxOnChange}
        onSliderChanged={handleSliderChange}
        className="left-section"
      />
      <ProductList
        products={filteredProducts}
        onAddToCart={handleAddToCartRequest}
        className="right-section"
      />
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
    market: state.market,
    filters: state.filters,
    header: state.header,
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
  updateAddToCart,
  updatePriceFilter,
  loadFilters,
  searchProducts,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductShell);
