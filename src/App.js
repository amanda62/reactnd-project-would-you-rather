import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Add from "./views/Add";
import Header from "./components/Header";
import Home from "./views/Home";
import Leaderboard from "./views/Leaderboard";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import PollDetail from "./views/PollDetail";
import Register from "./views/Register";
import { getQuestions } from "./services";

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

  useEffect(() => {
    getQuestions();
  }, []);
  //empty array, only executes when it mounts

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
          <ProtectedRoute exact path="/add">
            <Add />
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
