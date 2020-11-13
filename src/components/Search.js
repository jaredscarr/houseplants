import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import NavBar from './NavBar';
import PlantList from './PlantList';

const TREFLE_BASE_URL = process.env.REACT_APP_BASE_URL

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Search = () => {
  const { authState, authService } = useOktaAuth();
  const [results, setResults] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const classes = useStyles();

  useEffect(() => {
    if (!authState.isAuthenticated) {
      setUserInfo(null);
    } else {
      authService.getUser().then(info => setUserInfo(info))
    }
  }, [authService, authState]);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const handleSearch = (event) => {
    event.preventDefault();
    const url = new URL(`${TREFLE_BASE_URL}/plants/search`);
    const token = localStorage.getItem('trefleJwtToken');
    // clearn any parameters from previous request
    url.searchParams.delete('q');
    url.searchParams.append('q', searchQuery);

    fetch(url,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    )
    .then(response => response.json())
    .then(response => setResults(response.data));
  };

  return userInfo ?
    <div>
      <NavBar />
        <div className={classes.paper}>
          <form onSubmit={handleSearch}>
            <div>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="search"
                    label="Search"
                    id="search"
                    value={searchQuery}
                    onChange={handleChange}
                    placeholder="Search"
                  />
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSearch}
                    value="Submit"
                  >
                  Search
                  </Button>
                </Grid>
              </Grid>
            </div>
          </form>
        <PlantList list={results} button="Add"/>
      </div>
    </div>
    :
    <h1>Loading</h1>
}

export default Search;