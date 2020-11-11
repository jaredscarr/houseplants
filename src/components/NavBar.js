import React from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const { authState, authService } = useOktaAuth();
  const history = useHistory();
  const classes = useStyles();

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  const button = authState.isAuthenticated ?
    <Button color="inherit" onClick={() => {authService.logout()}}>Logout</Button> :
    <Button color="inherit" onClick={() => {history.push('/login')}}>Login</Button>;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            House Plants
          </Typography>
          {authState.isAuthenticated &&
            <div>
              <Button color="inherit"  onClick={() => history.push("/dashboard")}>Dashboard</Button>
              <Button color="inherit"  onClick={() => history.push("/search")}>Search</Button>
            </div>
          }
          {button}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
