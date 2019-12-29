import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import store from "./store";

test("renders learn react link", () => {
  const { getByText } = render(<App store={store} />);
  const appText = getByText(/App/i);
  expect(appText).toBeInTheDocument();
});
