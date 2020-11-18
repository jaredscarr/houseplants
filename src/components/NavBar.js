import React from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Spinner from './Spinner';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const { authState, authService } = useOktaAuth();
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (authState.isPending) {
    return <Spinner />;
  }

  const button = authState.isAuthenticated ?
    <Button data-testid="logout-button" color="inherit" onClick={() => {authService.logout()}}>Logout</Button> :
    <Button data-testid="login-button" color="inherit" onClick={() => {history.push('/login')}}>Login/Signup</Button>;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          { authState.isAuthenticated &&
          <IconButton
            data-testid="simple-menu"
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          }
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => history.push("/dashboard")}>Dashboard</MenuItem>
            <MenuItem onClick={() => history.push("/search")}>Search</MenuItem>
          </Menu>
          <Typography variant="h6" className={classes.title}>
            House Plants
          </Typography>
          {button}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
