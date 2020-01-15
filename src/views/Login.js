import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { login, setUsers } from "../redux/actions";
import { _getUsers } from "../_DATA";

//QUESTIONS: select onopen on close, controlled, why?

const useStyles = makeStyles(theme => ({
  root: { padding: theme.spacing(2) },
  logInButton: {
    margin: `${theme.spacing(2)}px 0`
  },
  register: {
    margin: `${theme.spacing(2)}px 0`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const users = useSelector(state => state.users);
  const [currentUser, setUser] = useState();

  useEffect(() => {
    (async () => {
      const users = await _getUsers();
      setUsers(users);
    })();
  }, []);

  const handleChange = event => setUser(event.target.value);
  const handleSubmit = () => {
    login({ user: currentUser, timestamp: new Date().getTime() });
    history.push("/");
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h3">Welcome</Typography>
      <Typography variant="h4">Please log in</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl margin="normal" fullWidth>
          <InputLabel id="username">Username</InputLabel>
          <Select autoWidth onChange={handleChange} labelId="username">
            {users &&
              Object.values(users).map(user => (
                <MenuItem key={user.id} value={user.id}>
                  {user.id}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.logInButton}
          type="submit"
        >
          Log in
        </Button>
      </form>
      <div className={classes.register}>
        New around here?
        <Button onClick={() => history.push("/register")} fullWidth>
          Make a profile.
        </Button>
      </div>
    </Paper>
  );
}
