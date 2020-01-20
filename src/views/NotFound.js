import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "end"
  }
}));

export default function NotFound() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4">
        Sorry, the page you are looking for has gone *poof*
      </Typography>
      <Typography variant="h5">#404</Typography>
      <Link to="/">Click Me!</Link>
    </div>
  );
}
