import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";

export default function AppProvider({ children }) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}
