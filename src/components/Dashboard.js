import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useHistory } from 'react-router-dom';
import PlantList from './PlantList';

const BASE_URL = process.env.REACT_APP_AWS_GATEWAY_URL;
const USER_PLANTS_URL = new URL(`${BASE_URL}/plants`);
const CLAIM_JWT_URL = `${BASE_URL}/auth/claim`;
const TREFLE_API_BASE_URL = process.env.REACT_APP_BASE_URL;

const validToken = (token, expDateString) => {
  if (!token) {
    return false
  } 

  if (!expDateString) {
    return false
  } 

  let expDateObj = new Date(expDateString);
  let nowDateObj = new Date();
  // just for a buffer suptract 2 hours from now
  nowDateObj.setHours(nowDateObj.getHours() - 2);

  // if now - 2 hours is greater than the expiration date return false
  if (nowDateObj > expDateObj) {
    return false
  }
    return true
}

const Dashboard = () => {
  const { authState, authService } = useOktaAuth();
  const history = useHistory();

  const [userInfo, setUserInfo] = useState(null);
  // stored plant id's from database
  const [userPlants, setUserPlants] = useState([]);
  // plants from the API
  const [plantData, setPlantData] = useState([]);
  const [trefleToken, setTrefleToken] = useState(localStorage.getItem('trefleJwtToken'));
  const [trefleExpiration, setExpiration] = useState(localStorage.getItem('trefleExpiration'));


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

  return (
    <div>
      <h1>User Dashboard</h1>
      {userInfo &&
        <p>Welcome, {userInfo.name}!</p>
      }
      <button onClick={()=> history.push("/search")}>Add Plant</button>
      <PlantList list={plantData} button="Remove" />
    </div>
  );
}

export default Dashboard;