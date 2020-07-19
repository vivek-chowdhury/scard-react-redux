import React from "react";
import { render, cleanup } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import ProductShell from "./ProductShell";

afterEach(cleanup);
function renderProductShellScreen(newState) {
  const mockStore = configureMockStore();
  const history = createMemoryHistory();
  const state = {
    market: {
      products: [],
      cart: [],
    },
    filters: {
      brandFilters: [],
      colourFilters: [],
      priceFilter: {
        min: 0,
        max: 100,
        step: 1,
        selected: 100,
      },
    },
    user: {
      username: "",
      password: "",
      fullName: "",
      isLoggedIn: false,
      rememberMe: false,
      error: "",
    },
    app: { stayHidden: true },
    header: { searchBy: "" },
  };
  const finalState = newState ? newState : state;
  const store = mockStore(finalState);

  return render(
    <Provider store={store}>
      <ProductShell {...finalState} history={history} />
    </Provider>
  );
}

it("should load product shell successfully", () => {
  const { container } = renderProductShellScreen();
  const productShell = container.querySelector(".product-shell");
  expect(productShell).toBeDefined();
});

it("should load product filter container successfully", () => {
  const { container } = renderProductShellScreen();
  const productFilterContainer = container.querySelector(
    ".product-filter-container"
  );
  expect(productFilterContainer).toBeDefined();
});

it("should load product list container successfully", () => {
  const { container } = renderProductShellScreen();
  const productListContainer = container.querySelector(
    ".product-list-container"
  );
  expect(productListContainer).toBeDefined();
});

it("should have Brand filter section", () => {
  const { getByText } = renderProductShellScreen();
  const brand = getByText(/Brand/i);
  expect(brand).toBeDefined();
});

it("should have Colour filter section", () => {
  const { getByText } = renderProductShellScreen();
  const colour = getByText(/Colour/i);
  expect(colour).toBeDefined();
});

it("should have Price filter section", () => {
  const { getByText } = renderProductShellScreen();
  const price = getByText(/Select Price range/i);
  expect(price).toBeDefined();
});
