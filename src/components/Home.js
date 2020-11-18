import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import NavBar from './NavBar';
import Spinner from './Spinner';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(20, 0, 30),
  },
}));

const Home = () => {
  const { authState } = useOktaAuth();
  const history = useHistory();
  const classes = useStyles();

  if (authState.isPending) {
    return <Spinner />;
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
