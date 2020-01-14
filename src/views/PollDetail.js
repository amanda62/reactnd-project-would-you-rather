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
  },
  stats: {
    display: "flex",
    flexDirection: "column",
    margin: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      justifyContent: "space-between"
    }
  }
}));

export default function PollDetail() {
  const classes = useStyles();
  const params = useParams();
  const currentUser = useSelector(state => state.currentUser.user);
  const currentQuestion = useSelector(
    state => state.questions[params.questionId]
  );
  const getAnswer = () => {
    if (currentQuestion.optionOne.votes.includes(currentUser))
      return currentQuestion.optionOne.text;
    if (currentQuestion.optionTwo.votes.includes(currentUser))
      return currentQuestion.optionTwo.text;
    return null;
  };
  const answer = getAnswer();

  return (
    <Paper className={classes.root}>
      {answer === null ? (
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
        <div>
          <Typography variant="h4">{`you chose: ${answer}`}</Typography>
          <div className={classes.stats}>
            <Typography variant="h6">
              {currentQuestion.optionOne.text}
            </Typography>
            <Typography>
              received {currentQuestion.optionOne.votes.length} votes
            </Typography>
          </div>
          <div className={classes.stats}>
            <Typography variant="h6">
              {currentQuestion.optionTwo.text}
            </Typography>
            <Typography>
              received {currentQuestion.optionTwo.votes.length} votes
            </Typography>
          </div>
        </div>
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
