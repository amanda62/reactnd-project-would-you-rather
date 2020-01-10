import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  // input: {
  //   width: "100%",
  //    margin: "dense"
  // }
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [newQuestion, setNewQuestion] = useState({
    optionOne: "",
    optionTwo: ""
  });

  return (
    <>
      <form onSubmit="">
        <Typography variant="h3">Welcome</Typography>
        <Typography variant="h4">Please log in</Typography>
        <TextField
          fullWidth
          margin="dense"
          className={classes.input}
          label="username"
          value=""
          onChange=""
        ></TextField>
        <TextField
          fullWidth
          margin="dense"
          className={classes.input}
          label="password"
          value=""
          onChange=""
        ></TextField>
      </form>
      <Button onClick={() => history.push("/newUser")}>
        New around here? Make a profile.
      </Button>
    </>
  );
}
