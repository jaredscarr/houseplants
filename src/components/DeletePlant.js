import React, { useState } from 'react';

const BASE_URL = process.env.REACT_APP_AWS_GATEWAY_URL;
const USER_PLANTS_URL = new URL(`${BASE_URL}/plants`);

const AddPlant = ({ userId, plantId }) => {
  const [plantRemoved, setPlantRemoved] = useState(false)

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
    setPlantRemoved(true);
  }

  return (
    <div>
        <button onClick={() => deletePlant(userId, plantId)} data-testid="removeToggleButton" disabled={plantRemoved}>{plantRemoved === true ? "Removed" : "Remove"}</button>
    </div>
  );
}

export default AddPlant;