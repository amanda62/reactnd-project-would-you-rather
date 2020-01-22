import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { TextField, Typography, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { saveQuestion } from "../services";

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

export default function Add() {
  const classes = useStyles();
  const history = useHistory();
  const author = useSelector(state => state.currentUser.id);

  const [newQuestion, setNewQuestion] = useState({
    optionOne: "",
    optionTwo: ""
  });

  const handleChange = name => event =>
    setNewQuestion({ ...newQuestion, [name]: event.target.value });
  const handleSubmit = async event => {
    event.preventDefault();
    if (!newQuestion.optionOne.trim() || !newQuestion.optionTwo.trim()) return;
    await saveQuestion({
      optionOneText: newQuestion.optionOne,
      optionTwoText: newQuestion.optionTwo,
      author
    });
    history.push("/");
  };

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} variant="h1">
        Would you rather:
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="optionOne"
          label="Option One"
          className={classes.textField}
          value={newQuestion.optionOne.text}
          onChange={handleChange("optionOne")}
          margin="dense"
          multiline
        ></TextField>
        <TextField
          fullWidth
          id="optionTwo"
          label="Option Two"
          className={classes.textField}
          value={newQuestion.optionTwo.text}
          onChange={handleChange("optionTwo")}
          margin="dense"
          multiline
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
