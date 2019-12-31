import React from "react";
import { connect } from "react-redux";
import { Card, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
  title: {
    ...theme.typography.h3,
    paddingBottom: theme.spacing(2)
  },
  card: {
    padding: theme.spacing(2)
  }
}));

function App({ questions, dispatch }) {
  const classes = useStyles();
  const currentQuestion = Object.values(questions).find(
    question => question.answer === null
  );
  const handleClick = (questionId, option) => {
    const action = {
      type: "vote",
      payload: {
        questionId,
        option
      }
    };
    dispatch(action);
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h1">
        Would you rather:
      </Typography>
      <Card className={classes.card}>
        {currentQuestion ? (
          <>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleClick(currentQuestion.id, "optionOne")}
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
              onClick={() => handleClick(currentQuestion.id, "optionTwo")}
            >
              {currentQuestion.optionTwo.text}
            </Button>
          </>
        ) : (
          <Typography variant="h3">ALL QUESTIONS DONE-ZO!</Typography>
        )}
      </Card>
    </div>
  );
}

const mapStatetoProps = state => ({
  questions: state.questions
});
//const mapDispatchToProps  = () => {}  if the second argument isn't passed
//to connect the component will receive dispatch by default
export default connect(mapStatetoProps)(App);
