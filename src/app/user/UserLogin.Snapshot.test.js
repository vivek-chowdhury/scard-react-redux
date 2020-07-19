import React from "react";
import UserLogin from "./UserLogin";
import renderer from "react-test-renderer";
import { user } from "./../../mock/mockDatabase";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

function renderLoginTree(newState) {
  const mockStore = configureMockStore();
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

  return renderer.create(
    <Provider store={store}>
      <UserLogin user={user} />
    </Provider>
  );
}

it("it should render empty login form", () => {
  const tree = renderLoginTree();
  expect(tree).toMatchSnapshot();
});
