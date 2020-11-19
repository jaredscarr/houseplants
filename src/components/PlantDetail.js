import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import NavBar from './NavBar';
import Spinner from './Spinner';
import Footer from './Footer';

const BASE_URL = process.env.REACT_APP_AWS_GATEWAY_URL;
const USER_PLANTS_URL = new URL(`${BASE_URL}/plants`);

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justify: 'flex-start',
  },
  buttonContainer: {
    marginTop: theme.spacing(4),
  },
  buttons: {
    marginRight: theme.spacing(4),
  },
}));

const PlantDetail = (props) => {
  const history = useHistory();
  const { authState, authService } = useOktaAuth();
  const classes = useStyles();

  const { plant, button } = props.location.state;
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (authState.isPending) {
      return <Spinner />;
    } else if (!authState.isAuthenticated) {
      setUserInfo(null);
    } else {
      authService.getUser().then(info => setUserInfo(info))
    }
  }, [authState, authService])

  const handleAddition = (plant) => {
    fetch(USER_PLANTS_URL,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip,deflate,br',
          'Accept': '*/*',
          'Connection': 'keep-alive'
        },
        body: JSON.stringify({ userid: userInfo.sub, plantid: plant.id })
      }
    );
    history.push('/dashboard');
  }

  const handleRemove = (plant) => {
    fetch(USER_PLANTS_URL,
      {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip,deflate,br',
          'Accept': '*/*',
          'Connection': 'keep-alive'
        },
        body: JSON.stringify({ userid: userInfo.sub, plantid: plant.id })
      }
    );
    history.push('/dashboard');
  }

  const handleReturnToDashboard = () => {
    history.push('/dashboard');
  }

  const handleReturnToSearch = () => {
    history.push('/search');
  }

  const ActionButton = (button) => {
    return (button.button === 'Remove' ?
      <Button className={classes.buttons} variant="contained" onClick={() => handleRemove(plant)}>Remove</Button> :
      <Button className={classes.buttons} variant="contained" onClick={() => handleAddition(plant)}>Add</Button>
    );
  }

  const BackButton = (button) => {
    return (button.button === 'Remove' ?
      <Button className={classes.buttons} variant="contained" onClick={() => handleReturnToDashboard()}>Back</Button> :
      <Button className={classes.buttons} variant="contained" onClick={() => handleReturnToSearch()}>Back</Button>
    );
  }

  const image = plant.image_url !== null ? plant.image_url : '/palm_dark.png';
  
  return (
    <div className="plantDetail">
      <NavBar />
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12} sm={4} md={7} className={classes.image} style={{ backgroundImage: `url(${image})` }}/>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <List>
              <ListItem>
                <ListItemText
                  primary="Common Name"
                  secondary={plant.common_name}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Genus"
                  secondary={plant.genus}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Scientific Name"
                  secondary={plant.scientific_name}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Notes"
                  secondary={plant.observations}
                />
              </ListItem>
            </List>
            <Grid container justify="flex-end" className={classes.buttonContainer} >
              <Grid item>
                <BackButton button={button} />
              </Grid>
              <Grid item>
                <ActionButton button={button} />
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid>
          <Grid item>
            <Footer />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default PlantDetail;