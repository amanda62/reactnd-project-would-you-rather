import React, { useState } from "react";
import { TextField, Typography, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import uuid from "uuid/v5";
import { createNewQuestion } from "../redux/actions";

//need to generate id
//pull user data, etc.
//need to do onSubmit

const useStyles = makeStyles(theme => ({
  root: { padding: theme.spacing(2) },
  title: {
    ...theme.typography.h3,
    paddingBottom: theme.spacing(2)
  },
  button: {
    margin: `${theme.spacing(2)}px 0`
  }
}));

export default function Ask() {
  const classes = useStyles();
  const [newQuestion, setNewQuestion] = useState({
    optionOne: "",
    optionTwo: ""
  });

  const handleChange = name => event => {
    setNewQuestion({ ...newQuestion, [name]: { text: event.target.value } });
  };
  const handleSubmit = () => {
    createNewQuestion({
      id: uuid(),
      answer: null,
      timestamp: new Date().getTime(),
      author: "currentUser",
      optionOne: {
        votes: [],
        text: newQuestion.optionOne
      },
      optionTwo: {
        votes: [],
        text: newQuestion.optionTwo
      }
    });
  };

  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Typography className={classes.title} variant="h1">
          Would you rather:
        </Typography>

        <TextField
          fullWidth
          id="optionOne"
          label="Option One"
          className={classes.textField}
          value={newQuestion.optionOne.text}
          onChange={handleChange("optionOne")}
          margin="dense"
        ></TextField>
        <TextField
          fullWidth
          id="optionTwo"
          label="Option Two"
          className={classes.textField}
          value={newQuestion.optionTwo.text}
          onChange={handleChange("optionTwo")}
          margin="dense"
        ></TextField>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
}
