import React, { useState } from 'react';

const BASE_URL = process.env.REACT_APP_AWS_GATEWAY_URL;
const USER_PLANTS_URL = new URL(`${BASE_URL}/plants`);

const AddPlant = ({ userId, plantId }) => {
  const [plantAdded, setPlantAdded] = useState(false)

  const searchPlants = (userId, plantId) => {
    // I need to rethink what occurs when a click happens and what shoul dbe rendered
    // could figure out how to clear the params or simple call a redirect back to itself?
    fetch(USER_PLANTS_URL,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip,deflate,br',
          'Accept': '*/*',
          'Connection': 'keep-alive'
        },
        body: JSON.stringify({ userid: userId, plantid: plantId })
      }
    );
    setPlantAdded(true);
  }

  return (
    <div>
        <button onClick={() => searchPlants(userId, plantId)} data-testid="toggleButton" disabled={plantAdded}>{plantAdded === true ? "Added" : "Add"}</button>
    </div>
  );
}

export default AddPlant;