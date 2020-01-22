import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    textAlign: "center",
    marginTop: "10px"
  }
}));

export default function NotFound() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4">
        Sorry, the page you are looking for has gone
      </Typography>
      <Typography variant="h3">*poof*</Typography>
      <br />
      <Typography variant="h5">#404</Typography>
      <br />
      <Link to="/">Click Me!</Link>
    </div>
  );
}
