import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useHistory } from 'react-router-dom';
import NavBar from './NavBar';
import PlantList from './PlantList';

const TREFLE_BASE_URL = process.env.REACT_APP_BASE_URL

const Search = () => {
  const { authState, authService } = useOktaAuth();
  const history = useHistory();

  const [results, setResults] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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
      <button onClick={() => history.push("/dashboard")}>Dashboard</button>
      <form onSubmit={handleSearch}>
        <input type="text" value={searchQuery} onChange={handleChange} placeholder="Search" />
        <input type="submit" value="Submit" onClick={handleSearch} />
      </form>
      <h1 className="h1">Search Results</h1>
      <h3>Results</h3>
      <PlantList list={results} button="Add"/>
    </div>
    :
    <h1>Loading</h1>
}

export default Search;