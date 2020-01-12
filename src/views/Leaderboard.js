import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  Avatar
} from "@material-ui/core";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2)
  },
  avatar: { width: theme.spacing(15), height: theme.spacing(15) },
  content: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row"
    }
  },
  score: {
    maxWidth: "40%",
    alignSelf: "center",
    [theme.breakpoints.up("md")]: {
      maxWidth: "20%"
    }
  },
  horizontalDivider: {
    margin: theme.spacing(2)
  },
  infoContainer: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  info: {
    justifyContent: "space-between",
    display: "flex"
  }
}));

export default function Leaderboard() {
  const classes = useStyles();
  const users = useSelector(state => state.users);
  const score = (answeredQ, createdQ) => answeredQ + createdQ;
  const userScore = user =>
    score(Object.keys(user.answers).length, user.questions.length);

  const maxScore = Math.max(
    ...Object.values(users).map(user => userScore(user))
  );
  const desktop = useMediaQuery(theme => theme.breakpoints.up("md"));

  return (
    <>
      {Object.values(users)
        .sort((a, b) => userScore(b) - userScore(a))
        .map(user => (
          <Card className={classes.card} key={user.id} raised="true">
            <CardHeader
              avatar={<Avatar src={user.avatarURL} />}
              title={user.name}
            />

            <CardContent className={classes.content}>
              <CircularProgressbar
                className={classes.score}
                value={score(
                  Object.keys(user.answers).length,
                  user.questions.length
                )}
                maxValue={maxScore}
                text={score(
                  Object.keys(user.answers).length,
                  user.questions.length
                )}
              />
              <Divider
                orientation={desktop ? "vertical" : "horizontal"}
                className={classes.horizontalDivider}
              />
              <div className={classes.infoContainer}>
                <div className={classes.info}>
                  <Typography variant="body2" color="textSecondary">
                    Answered Questions
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {Object.keys(user.answers).length}
                  </Typography>
                </div>
                <div className={classes.info}>
                  <Typography variant="body2" color="textSecondary">
                    Created Questions
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {user.questions.length}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </>
  );
}
