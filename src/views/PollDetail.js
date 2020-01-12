import React from "react";
import { useSelector } from "react-redux";
import { Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { vote } from "../redux/actions";
import { format } from "date-fns";

const useStyles = makeStyles(theme => ({
  root: { padding: theme.spacing(2) },
  button: {
    margin: `${theme.spacing(1)}px 0`
  }
}));

export default function PollDetail() {
  const classes = useStyles();
  const params = useParams();
  const currentQuestion = useSelector(
    state => state.questions[params.questionId]
  );

  return (
    <Paper className={classes.root}>
      {currentQuestion.answer === null ? (
        <>
          <Typography variant="h3">Would you rather: </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => vote(currentQuestion.id, "optionOne")}
            className={classes.button}
          >
            {currentQuestion.optionOne.text}
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => vote(currentQuestion.id, "optionTwo")}
            className={classes.button}
          >
            {currentQuestion.optionTwo.text}
          </Button>
        </>
      ) : (
        <Typography>{`you chose: ${
          currentQuestion[currentQuestion.answer].text
        }`}</Typography>
      )}
      <Typography variant="caption">
        Asked by {currentQuestion.author}
        {format(
          new Date(currentQuestion.timestamp),
          " BBB 'of' PPP 'at' h:mm a"
        )}
      </Typography>
    </Paper>
  );
}
