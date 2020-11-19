import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NavBar from  './NavBar';
import DashboardPlants from './DashboardPlants';
import Spinner from './Spinner';
import Footer from './Footer';

const BASE_URL = process.env.REACT_APP_AWS_GATEWAY_URL;
const USER_PLANTS_URL = new URL(`${BASE_URL}/plants`);
const CLAIM_JWT_URL = `${BASE_URL}/auth/claim`;
const TREFLE_API_BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
  },
  welcome: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

const validToken = (token, expDateString) => {
  if (!token) {
    return false
  } 

  if (!expDateString) {
    return false
  } 

  let expDateObj = new Date(expDateString);
  let nowDateObj = new Date();
  
  if (nowDateObj > expDateObj) {
    return false
  }
    return true
}

const Dashboard = () => {
  const { authState, authService } = useOktaAuth();
  const classes = useStyles();

  const [userInfo, setUserInfo] = useState(null);
  // stored plant id's from database
  const [userPlants, setUserPlants] = useState([]);
  // plants from the API
  const [plantData, setPlantData] = useState([]);
  const [trefleToken, setTrefleToken] = useState(localStorage.getItem('trefleJwtToken'));
  const [trefleExpiration, setExpiration] = useState(localStorage.getItem('trefleExpiration'));

  useEffect(() => {
    if (!authState.isAuthenticated) {
      setUserInfo(null);
    } else {
      authService.getUser().then(info => setUserInfo(info))
    }
  }, [authService, authState]);
  
  useEffect(() => {
    if (!validToken(trefleToken, trefleExpiration)) {
      fetch(CLAIM_JWT_URL,
        {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ origin: window.location.origin })
        }
      )
      .then(res => res.json())
      .then(
        (result) => {
          const now = new Date()
          now.setHours(now.getHours() + 12)
          const expirationString = now.toString();
          localStorage.setItem('trefleJwtToken', result['token'])
          localStorage.setItem('trefleExpiration', expirationString)
          setTrefleToken(result['token'])
          setExpiration(expirationString)
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      USER_PLANTS_URL.searchParams.delete('userid');
      USER_PLANTS_URL.searchParams.append('userid', userInfo.sub);
      fetch(USER_PLANTS_URL)
      .then(response => response.json())
      .then(
        (result) => {
          setUserPlants(result);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [userInfo]);

  useEffect(() => {
    if (userPlants) {
      const fetch_promises = userPlants.map(plant => {
        return fetch(`${TREFLE_API_BASE_URL}/plants/${plant.plant_id}`,
            {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${trefleToken}`
              }
            }
          ).then(response => response.json());
      });

      Promise.all(fetch_promises).then(results => setPlantData(results));
    }
  }, [userPlants]);

  if (authState.isPending) {
    return <Spinner />;
  }

  return (
    <div>
      <NavBar />
      <div className={classes.root}>
        <Grid container spacing={4} justify="flex-end">
          <Grid item className={classes.welcome}>
            {userInfo &&
              <Typography variant="caption">Welcome, {userInfo.name}!</Typography>
            }
          </Grid>
        </Grid>
      </div>
      <DashboardPlants plants={plantData} />
      <Footer />
    </div>
  );
}

export default Dashboard;