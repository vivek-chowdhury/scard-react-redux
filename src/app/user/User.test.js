import React from "react";
import { render, cleanup } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import UserLogin from "./UserLogin";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";

afterEach(cleanup);

function renderLoginScreen(newState) {
  const mockStore = configureMockStore();
  const history = createMemoryHistory();
  const state = {
    user: {
      username: "",
      password: "",
      fullName: "",
      isLoggedIn: false,
      rememberMe: false,
      error: "",
    },
    app: { stayHidden: true },
  };
  const finalState = newState ? newState : state;
  const store = mockStore(finalState);

  return render(
    <Provider store={store}>
      <UserLogin {...finalState} history={history} />
    </Provider>
  );
}

it("it should contains empty user id fields", () => {
  const { getByLabelText } = renderLoginScreen();
  const user = getByLabelText("User id :");
  expect(user.value).toBe("");
});

it("it should contains empty password fields", () => {
  const { getByLabelText } = renderLoginScreen();
  const password = getByLabelText("Password :");
  expect(password.value).toBe("");
});

it("it should contains unchecked remember me", () => {
  const { getByLabelText } = renderLoginScreen();
  const checkbox = getByLabelText("Remember me");
  expect(checkbox.checked).toEqual(false);
});

it("should disable login button", () => {
  const { container } = renderLoginScreen();
  const login = container.querySelector(".btn-primary");
  expect(login.disabled).toBe(true);
});

it("should enable login button", () => {
  const state = {
    user: {
      username: "amigo",
      password: "delta",
      fullName: "Mr Amigo",
      isLoggedIn: true,
      rememberMe: false,
      error: "",
    },
    app: { stayHidden: true },
  };
  const { container } = renderLoginScreen(state);
  const login = container.querySelector(".btn-primary");
  expect(login.disabled).toBe(false);
});

it("should populate user id field", () => {
  const state = {
    user: {
      username: "amigo",
      password: "delta",
      fullName: "Mr Amigo",
      isLoggedIn: true,
      rememberMe: false,
      error: "",
    },
    app: { stayHidden: true },
  };
  const { getByLabelText } = renderLoginScreen(state);
  const user = getByLabelText("User id :");
  expect(user.value).toBeDefined();
  expect(user.value).toBe("amigo");
});

it("should populate password field", () => {
  const state = {
    user: {
      username: "amigo",
      password: "delta",
      fullName: "Mr Amigo",
      isLoggedIn: true,
      rememberMe: false,
      error: "",
    },
    app: { stayHidden: true },
  };
  const { getByLabelText } = renderLoginScreen(state);
  const password = getByLabelText("Password :");
  expect(password.value).toBeDefined();
  expect(password.value).toBe("delta");
});
