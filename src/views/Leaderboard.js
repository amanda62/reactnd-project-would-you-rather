import React from "react";
import { useSelector } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  // Divider,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
  // Box
  // Avatar
} from "@material-ui/core";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const useStyles = makeStyles(theme => ({
  root: {},
  card: {
    display: "flex",
    flexDirection: "row"
  },
  media: {
    width: "30%"
  },
  content: {
    width: "50%",
    borderBottom: "none"
  },
  score: {
    width: "20%"
  }
  // shapeCircle: {
  // borderRadius: "50%",
  // backgroundColor: theme.palette.primary.main,
  // width: 40,
  // height: 40,
  // borderRadius: "50px",
  // background: "green",
  // color: "white",
  // padding: "10px 15px"
  // }
}));

const TableCellNoLines = withStyles({
  root: {
    borderBottom: "none"
  }
})(TableCell);

export default function Leaderboard() {
  const classes = useStyles();
  const users = useSelector(state => state.users);
  const score = (answeredQ, createdQ) => answeredQ + createdQ;
  const userScore = user =>
    score(Object.keys(user.answers).length, user.questions.length);

  const maxScore = Math.max(
    ...Object.values(users).map(user => userScore(user))
  );

  return (
    <div className={classes.root}>
      {Object.values(users)
        .sort((a, b) => userScore(b) - userScore(a))
        .map(user => (
          <Card className={classes.card} key={user.id}>
            <CardMedia
              className={classes.media}
              component="img"
              alt="user avatar"
              height="100%"
              image=""
              title="user avatar"
            />
            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
            {/* <Divider orientation="vertical" variant="inset" /> */}
            <CardContent className={classes.content}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCellNoLines>
                        <Typography variant="h3">{user.name}</Typography>
                      </TableCellNoLines>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCellNoLines>
                        <Typography>Answered Questions</Typography>
                      </TableCellNoLines>
                      <TableCellNoLines>
                        <Typography>
                          {Object.keys(user.answers).length}
                        </Typography>
                      </TableCellNoLines>
                    </TableRow>
                  </TableBody>

                  <TableRow>
                    <TableCellNoLines>
                      <Typography>Created Questions</Typography>
                    </TableCellNoLines>
                    <TableCellNoLines>
                      <Typography>{user.questions.length}</Typography>
                    </TableCellNoLines>
                  </TableRow>
                </Table>
              </TableContainer>
            </CardContent>

            <TableContainer className={classes.score}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCellNoLines>
                      <Typography>Score</Typography>
                    </TableCellNoLines>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCellNoLines>
                      <Typography>
                        <CircularProgressbar
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
                      </Typography>
                    </TableCellNoLines>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        ))}
    </div>
  );
}
