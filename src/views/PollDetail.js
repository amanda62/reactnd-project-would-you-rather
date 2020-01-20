import React from "react";
import { useSelector } from "react-redux";
import { Typography, Paper, Button, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { saveQuestionAnswer } from "../services";
import NotFound from "../views/NotFound";

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
  },
  attribution: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "baseline"
  }
}));

export default function PollDetail() {
  const classes = useStyles();
  const params = useParams();
  const currentUser = useSelector(state => state.currentUser);
  const currentQuestion = useSelector(
    state => state.questions[params.questionId]
  );
  const users = useSelector(state => state.users);
  const getAnswer = () => {
    if (currentQuestion.optionOne.votes.includes(currentUser.id))
      return currentQuestion.optionOne.text;
    if (currentQuestion.optionTwo.votes.includes(currentUser.id))
      return currentQuestion.optionTwo.text;
    return null;
  };

  const calculatePercentage = option =>
    (
      (currentQuestion[option].votes.length /
        (currentQuestion.optionOne.votes.length +
          currentQuestion.optionTwo.votes.length)) *
      100
    ).toFixed(0);

  if (!currentQuestion) {
    return <NotFound />;
  }

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
            onClick={() =>
              saveQuestionAnswer(currentUser, currentQuestion, "optionOne")
            }
            className={classes.button}
          >
            {currentQuestion.optionOne.text}
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() =>
              saveQuestionAnswer(currentUser, currentQuestion, "optionTwo")
            }
            className={classes.button}
          >
            {currentQuestion.optionTwo.text}
          </Button>
        </>
      ) : (
        <div>
          <Typography variant="h4">You chose:</Typography>
          <Typography variant="h4">{answer}</Typography>
          <div className={classes.stats}>
            <Typography variant="h6">
              {currentQuestion.optionOne.text}
            </Typography>
            <Typography>
              received {currentQuestion.optionOne.votes.length} votes
              {` (${calculatePercentage("optionOne")}%)`}
            </Typography>
          </div>
          <div className={classes.stats}>
            <Typography variant="h6">
              {currentQuestion.optionTwo.text}
            </Typography>
            <Typography>
              received {currentQuestion.optionTwo.votes.length} votes
              {` (${calculatePercentage("optionTwo")}%)`}
            </Typography>
          </div>
        </div>
      )}
      <div className={classes.attribution}>
        <Typography variant="caption">
          Asked by {currentQuestion.author}
          {format(
            new Date(currentQuestion.timestamp),
            " BBB 'of' PPP 'at' h:mm a"
          )}
        </Typography>
        <Avatar src={users[currentQuestion.author].avatarURL} />
      </div>
    </Paper>
  );
}
