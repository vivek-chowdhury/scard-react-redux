import React from "react";
import { render, cleanup } from "@testing-library/react";
import App from "./App";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);
function renderApplication() {
  const mockStore = configureMockStore();
  const store = mockStore({
    user: {
      username: "",
      password: "",
      fullName: "",
      isLoggedIn: false,
      rememberMe: false,
      error: "",
    },
    app: { stayHidden: true },
  });
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
}

it("It should load application", () => {
  const history = createMemoryHistory();
  renderApplication();
  expect(history.location.pathname).toBe("/");
});

it("It should load login screen", () => {
  const { container } = renderApplication();
  const screen = container.querySelector(".login-container");
  expect(screen).toBeDefined();
});

it("It should contains empty user id", () => {
  const { getByLabelText } = renderApplication();
  const user = getByLabelText("User id :");
  expect(user.value).toBe("");
});
