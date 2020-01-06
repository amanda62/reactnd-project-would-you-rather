import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import PollDetail from "./views/PollDetail";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/questions/:questionId">
          <PollDetail />
        </Route>
      </Switch>
    </div>
  );
}
