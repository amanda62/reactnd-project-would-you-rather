import React from "react";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Header from "./components/Header";
import Home from "./views/Home";
import PollDetail from "./views/PollDetail";
import Ask from "./views/Ask";
import Leaderboard from "./views/Leaderboard";
import Login from "./views/Login";
import Register from "./views/Register";
import { Container } from "@material-ui/core";

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
      <Header />
      <Container maxWidth="sm">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/questions/:questionId">
            <PollDetail />
          </Route>
          <Route exact path="/ask">
            <Ask />
          </Route>
          <Route exact path="/leaderboard">
            <Leaderboard />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}
