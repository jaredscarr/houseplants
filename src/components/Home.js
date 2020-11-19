import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NavBar from './NavBar';
import Spinner from './Spinner';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    opacity: 0.8,
    padding: theme.spacing(6, 0, 6),
  },
  image: {
    paddingTop: theme.spacing(18),
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  }
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
      <div className={classes.image} style={{ backgroundImage: `url(/palm_dark.png)` }}>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
              <Box letterSpacing={10} fontWeight="fontWeightMedium" m={1}>
                House Plants
              </Box>
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              <Box letterSpacing={3} fontWeight="fontWeightRegular" m={1}>
                Curate your plant collection
              </Box>
            </Typography>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
