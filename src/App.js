import React, { useEffect } from "react";
import { useSelector } from "react-redux";
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
import NotFound from "./views/NotFound";
import { _getQuestions } from "./_DATA";
import { setQuestions } from "./redux/actions";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default
  }
}));

const ProtectedRoute = props => {
  const currentUser = useSelector(state => state.currentUser);
  if (currentUser) return <Route {...props} />;
  return <Login />;
};

export default function App() {
  const classes = useStyles();

  useEffect(
    // whatever you want to do when the component mounts or updates
    //listener, empty array = only when mounts, vs. classes, etc.
    () => {
      (async () => {
        const questions = await _getQuestions();
        setQuestions(questions);
      })();
    },
    []
  );

  return (
    <div className={classes.root}>
      <Header />
      <Container maxWidth="sm">
        <Switch>
          <ProtectedRoute exact path="/">
            <Home />
          </ProtectedRoute>
          <ProtectedRoute exact path="/questions/:questionId">
            <PollDetail />
          </ProtectedRoute>
          <ProtectedRoute exact path="/ask">
            <Ask />
          </ProtectedRoute>
          <ProtectedRoute exact path="/leaderboard">
            <Leaderboard />
          </ProtectedRoute>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route path="/">
            <NotFound />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}
