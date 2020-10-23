import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import ClaimTrefleToken from './ClaimTrefleToken';

const BASE_URL = process.env.REACT_APP_AWS_GATEWAY_URL;
const USER_PLANTS_URL = new URL(`${BASE_URL}/users`);

const Dashboard = () => {
  const { authState, authService } = useOktaAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [results, setResults] = useState([])

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
      <ClaimTrefleToken />
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