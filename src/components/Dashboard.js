import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import DashboardPlantList from './DashboardPlantList';

const BASE_URL = process.env.REACT_APP_AWS_GATEWAY_URL;
const USER_PLANTS_URL = new URL(`${BASE_URL}/plants`);
const CLAIM_JWT_URL = `${BASE_URL}/auth/claim`;

const validToken = (token, date) => {
  console.log('In invalid token', token, date)
  // if either token is missing return false
  // if expired or will expire in the next hour return false
  return true
}

const deletePlant = (userId, plantId) => {
  fetch(USER_PLANTS_URL,
    {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip,deflate,br',
        'Accept': '*/*',
        'Connection': 'keep-alive'
      },
      body: JSON.stringify({ userid: userId, plantid: plantId })
    }
  );
}

const Dashboard = () => {
  const { authState, authService } = useOktaAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [results, setResults] = useState([]);
  const [trefleToken, setTrefleToken] = useState(localStorage.getItem('trefleJwtToken'))
  const [trefleExpiration, setExpiration] = useState(localStorage.getItem('trefleExpiration'))

  useEffect(() => {
    if (!validToken(trefleToken, trefleExpiration)) {
      fetch(CLAIM_JWT_URL,
        {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ origin: 'http://localhost:3000' })
        }
      )
      .then(res => res.json())
      .then(
        (result) => {
          localStorage.setItem('trefleJwtToken', result['token'])
          localStorage.setItem('trefleExpiration', result['expiration'])
          setTrefleToken(result['token'])
          setExpiration(result['expiration'])
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }, []);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      setUserInfo(null);
    } else {
      authService.getUser().then(info => setUserInfo(info))
    }
  }, [authService, authState]);

  useEffect(() => {
    if (userInfo) {
      USER_PLANTS_URL.searchParams.append('userid', userInfo.sub);
      fetch(USER_PLANTS_URL)
      .then(response => response.json())
      .then(data => setResults(data));
      console.log('effect ran');
    }
  }, [userInfo]);

  const handleRemove = (plant) => {
    console.log(plant.id);
    deletePlant(plant.user_id, plant.plant_id)
    const newList = results.filter((item) => item.id !== plant.id);
    setResults(newList);

  }

  return (
    <div>
      <h1>User Dashboard</h1>
      {userInfo &&
        <p>Welcome, {userInfo.name}!</p>
      }
      <DashboardPlantList list={results} onRemove={handleRemove} />
    </div>
  );
}

export default Dashboard;