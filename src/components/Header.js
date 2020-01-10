import React from "react";
import { AppBar, Tabs, Tab, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
    // backgroundColor: theme.palette.background.paper
    paddingBottom: theme.spacing(3)
  },
  left: {
    // justifyContent: "screenLeft"
  }
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const handleCallToRouter = value => {
    history.push(value);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={history.location.pathname}
          onChange={handleCallToRouter}
        >
          <Tab label="Home" value="/" onClick={() => history.push("/")} />
          <Tab label="Ask" value="/ask" onClick={() => history.push("/ask")} />
          <Tab
            label="Leaderboard"
            value="/leaderboard"
            onClick={() => history.push("/leaderboard")}
          />
          <Typography className={classes.left}>Hello User</Typography>
          <Tab
            className={classes.left}
            label="Logout"
            value="/logout"
            onClick={() => history.push("/login")}
          />
        </Tabs>
      </AppBar>
    </div>
  );
}
