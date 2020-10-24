import React, { useState } from 'react';

const BASE_URL = process.env.REACT_APP_AWS_GATEWAY_URL;
const USER_PLANTS_URL = new URL(`${BASE_URL}/plants`);

const AddPlant = ({ userId, plantId }) => {
  const [plantAdded, setPlantAdded] = useState(false)

  const searchPlants = (userId, plantId) => {
    USER_PLANTS_URL.searchParams.append('userid', userId);
    USER_PLANTS_URL.searchParams.append('plantid', plantId);
    fetch(USER_PLANTS_URL,
      {
        method: "POST",
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