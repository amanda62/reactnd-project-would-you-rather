import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./views/Home";

export default function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  );
}
