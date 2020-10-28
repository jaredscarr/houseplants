import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
// import ClaimTrefleToken from './ClaimTrefleToken';

const BASE_URL = process.env.REACT_APP_AWS_GATEWAY_URL;
const USER_PLANTS_URL = new URL(`${BASE_URL}/plants`);
const CLAIM_JWT_URL = `${BASE_URL}/auth/claim`;

const Dashboard = () => {
  const { authState, authService } = useOktaAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
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
      },
      (error) => {
        console.log(error);
      }
    )
  }, [])

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
    }
  }, [userInfo]);

  const resultList = results.map(row =>
    <li key={row.id}>{row.plant_id}</li>
  );

  return (
    <div>
      <h1>User Dashboard</h1>
      {userInfo &&
        <p>Welcome, {userInfo.name}!</p>
      }
      <ul>
        {resultList}
      </ul>
    </div>
  );
}

export default Dashboard;