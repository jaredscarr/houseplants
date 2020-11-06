import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

const BASE_URL = process.env.REACT_APP_AWS_GATEWAY_URL;
const USER_PLANTS_URL = new URL(`${BASE_URL}/plants`);

const PlantDetail = (props) => {
  const { plant, button } = props.location.state;
  const { authState, authService } = useOktaAuth();
  const history = useHistory();

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (authState.isPending) {
      return <div>Loading...</div>;
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
    history.push('/search');
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

  const ActionButton = (button) => {
    return (button.button === 'Remove' ?
      <button onClick={() => handleRemove(plant)}>Remove</button> :
      <button onClick={() => handleAddition(plant)}>Add</button>
    );
  }
  
  return (
    <div className="PlantDetail">
      <ul>
        <li>{plant.common_name}</li>
        <li>{plant.genus}</li>
        <li>{plant.scientific_name}</li>
        <li>{plant.observations}</li>
      </ul>
      <img src={plant.image_url} alt={plant.common_name} />
      {button &&
        <ActionButton button={button} />
      }
    </div>
  );
}

export default PlantDetail;