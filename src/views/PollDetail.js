import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { vote } from "../redux/actions";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {}
}));

export default function PollDetail() {
  const classes = useStyles();
  const params = useParams();
  const currentQuestion = useSelector(
    state => state.questions[params.questionId]
  );

  return (
    <div className={classes.root}>
      {`Poll Detail ${currentQuestion.id}`}

      {currentQuestion.answer === null ? (
        <>
          <Typography variant="h3">Would you rather: </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => vote(currentQuestion.id, "optionOne")}
          >
            {currentQuestion.optionOne.text}
          </Button>
          <Typography variant="h3" align="center">
            or
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => vote(currentQuestion.id, "optionTwo")}
          >
            {currentQuestion.optionTwo.text}
          </Button>
        </>
      ) : (
        <Typography>{`you chose: ${
          currentQuestion[currentQuestion.answer].text
        }`}</Typography>
      )}
      <Link to="/">Home</Link>
    </div>
  );
}
