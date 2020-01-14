import React from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Hidden,
  Avatar
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../redux/actions";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(3)
  },
  toolbar: {
    justifyContent: "space-between"
  },
  title: { flexGrow: 1 },
  user: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto"
  }
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const currentUser = useSelector(state => state.currentUser);
  const views = [
    { name: "Home", path: "/" },
    { name: "Ask", path: "/ask" },
    { name: "Leaderboard", path: "/leaderboard" }
    // { name: "Poll", path: "/questions" }
  ];

  //Desktop
  const handleCallToRouter = value => {
    history.push(value);
    handleClose();
  };
  const handleLogout = () => {
    logout();
    history.push("/login");
    handleClose();
  };

  //Small screen
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const [userAnchorEl, setUserAnchorEl] = React.useState(null);
  const menuOpen = Boolean(menuAnchorEl);
  const userOpen = Boolean(userAnchorEl);
  const handleMenu = event => setMenuAnchorEl(event.currentTarget);
  const handleUser = event => setUserAnchorEl(event.currentTarget);
  const handleClose = () => {
    setMenuAnchorEl(null);
    setUserAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          {currentUser && (
            <>
              <Hidden smDown>
                <Tabs
                  variant="fullWidth"
                  value={history.location.pathname}
                  onChange={handleCallToRouter}
                >
                  {views.map(view => (
                    <Tab
                      label={view.name}
                      value={view.path}
                      onClick={() => history.push(view.path)}
                    />
                  ))}
                </Tabs>
              </Hidden>
              <Hidden mdUp>
                <div>
                  <IconButton onClick={handleMenu} color="inherit">
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    anchorEl={menuAnchorEl}
                    open={menuOpen}
                    onClose={handleClose}
                  >
                    {views.map(view => (
                      <MenuItem onClick={() => handleCallToRouter(view.path)}>
                        {view.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
                <Typography variant="h6" className={classes.title}>
                  {/* {views.find(view => view.path === history.location.pathname).name} */}
                </Typography>
              </Hidden>
            </>
          )}
          <div className={classes.user}>
            {currentUser && (
              <Hidden smDown>
                <Typography>Hello {currentUser.user}</Typography>
              </Hidden>
            )}
            <IconButton onClick={handleUser} color="inherit">
              <Avatar src={currentUser && currentUser.avatarURL} />
            </IconButton>
            <Menu anchorEl={userAnchorEl} open={userOpen} onClose={handleClose}>
              {currentUser ? (
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              ) : (
                <MenuItem onClick={handleLogout}>Login</MenuItem>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
