import React from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../redux/actions";
import { AccountCircle } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(3)
  }
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const currentUser = useSelector(state => state.currentUser);

  const handleCallToRouter = value => {
    history.push(value);
  };
  const handleLogout = () => {
    logout();
    history.push("/login");
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
          <Tab
            label={
              <>
                <AccountCircle />
                Hello {currentUser.user}
              </>
            }
          />
          <Tab
            className={classes.left}
            label="Logout"
            value="/logout"
            onClick={handleLogout}
          />
        </Tabs>
      </AppBar>
    </div>
  );
}
