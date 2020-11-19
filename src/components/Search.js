import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import NavBar from './NavBar';
import PlantList from './PlantList';
import Spinner from './Spinner';
import Footer from './Footer';

const TREFLE_BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(25),
    marginBottom: theme.spacing(30),
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
  const { authState } = useOktaAuth();
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const classes = useStyles();

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

  return authState.isAuthenticated ?
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
                    inputProps={ {"data-testid": "search-input"} }
                  />
                </Grid>
                <Grid item>
                  <Button
                    data-testid="search-button"
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
      <Footer />
    </div>
    :
    <Spinner />
}

export default Search;