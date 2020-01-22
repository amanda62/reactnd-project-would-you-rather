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
    { name: "Add", path: "/add" },
    { name: "Leaderboard", path: "/leaderboard" }
  ];
  //The pathname may not map to existing tabs, because not every view has a corresponding tab (i.e. Poll Detail pages)
  const tabsValue = views
    .map(view => view.path)
    .includes(history.location.pathname)
    ? history.location.pathname
    : false;

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
                  value={tabsValue}
                  onChange={handleCallToRouter}
                >
                  {views.map(view => (
                    <Tab
                      label={view.name}
                      value={view.path}
                      key={view.path}
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
                      <MenuItem
                        key={view.path}
                        onClick={() => handleCallToRouter(view.path)}
                      >
                        {view.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </Hidden>
            </>
          )}
          <div className={classes.user}>
            {currentUser && <Typography>Hello {currentUser.name}</Typography>}
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
