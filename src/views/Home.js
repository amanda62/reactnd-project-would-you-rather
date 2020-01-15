import React from "react";
import { useSelector } from "react-redux";
import { Typography, Card, CardContent, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  title: {
    ...theme.typography.h3,
    paddingBottom: theme.spacing(2)
  },
  card: {
    marginBottom: theme.spacing(2),
    cursor: "pointer"
  },
  content: {
    textAlign: "center"
  }
}));

export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  const questions = useSelector(state => state.questions);
  const currentUser = useSelector(state => state.currentUser.user);
  const [currentTab, setCurrentTab] = React.useState("unanswered");
  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const getQuestions = currentTab => {
    if (currentTab === "answered")
      return Object.values(questions).filter(
        question =>
          question.optionOne.votes.includes(currentUser) ||
          question.optionTwo.votes.includes(currentUser)
      );
    if (currentTab === "unanswered")
      return Object.values(questions).filter(
        question =>
          !question.optionOne.votes.includes(currentUser) &&
          !question.optionTwo.votes.includes(currentUser)
      );
  };
  const showQuestions = getQuestions(currentTab);

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h1">
        Would you rather:
      </Typography>

      <Tabs variant="fullWidth" value={currentTab} onChange={handleChange}>
        <Tab label="Unanswered" value="unanswered" />
        <Tab label="Answered" value="answered" />
      </Tabs>

      <div>
        {showQuestions.length ? (
          showQuestions.map(question => (
            <Card
              className={classes.card}
              key={question.id}
              onClick={() => history.push(`/questions/${question.id}`)}
            >
              <CardContent className={classes.content}>
                <Typography>{question.answer}</Typography>
                <Typography variant="body1">
                  {question.optionOne.text}
                </Typography>
                <Typography variant="body2">or</Typography>
                <Typography variant="body1">
                  {question.optionTwo.text}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="h3">ALL QUESTIONS DONE-ZO!</Typography>
        )}
      </div>
    </div>
  );
}
