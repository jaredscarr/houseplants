import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import NavBar from './NavBar';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
}));

const Home = () => {
  const { authState } = useOktaAuth();
  const history = useHistory();
  const classes = useStyles();

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  if (authState.isAuthenticated) {
    history.push('/dashboard')
  }

  return (
    <div>
      <NavBar />
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            House Plants
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Keep track of plants your plants.
          </Typography>
        </Container>
      </div>
    </div>
  );
};

export default Home;
