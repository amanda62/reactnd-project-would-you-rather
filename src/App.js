import React from "react";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Poll from "./components/Poll";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
  title: {
    ...theme.typography.h3,
    paddingBottom: theme.spacing(2)
  }
}));

function App({ questions }) {
  const classes = useStyles();
  const currentQuestion = Object.values(questions).find(
    question => question.answer === null
  );

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h1">
        Would you rather:
      </Typography>
      <Poll currentQuestion={currentQuestion} />
    </div>
  );
}

const mapStatetoProps = state => ({
  questions: state.questions
});
//const mapDispatchToProps  = () => {}  if the second argument isn't passed
//to connect the component will receive dispatch by default
export default connect(mapStatetoProps)(App);
