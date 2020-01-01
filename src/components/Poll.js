import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Card, Typography, Button } from "@material-ui/core";
import { vote } from "../redux/actions";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

export default function Poll({ currentQuestion }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {
        <>
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
      }
    </Card>
  );
}
