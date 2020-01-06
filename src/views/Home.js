import React from "react";
import { useSelector } from "react-redux";
import { Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  title: {
    ...theme.typography.h3,
    paddingBottom: theme.spacing(2)
  },
  card: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    cursor: "pointer"
  }
}));

export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  const questions = useSelector(state => state.questions);

  const unansweredQuestions = Object.values(questions).filter(
    question => question.answer === null
  );
  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h1">
        Would you rather:
      </Typography>

      {unansweredQuestions.length ? (
        unansweredQuestions.map(question => (
          <Card
            className={classes.card}
            key={question.id}
            onClick={() => history.push(`/questions/${question.id}`)}
          >
            <Typography>{question.answer}</Typography>
            <Typography>{question.optionOne.text}</Typography>
            <Typography>{question.optionTwo.text}</Typography>
          </Card>
        ))
      ) : (
        <Typography variant="h3">ALL QUESTIONS DONE-ZO!</Typography>
      )}
    </div>
  );
}
