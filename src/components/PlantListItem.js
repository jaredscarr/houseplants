import React from 'react';

const PlantListItem = ({ plant, onHandler, button }) => {

  if (button) {
    return (plant.common_name ? 
      <li key={plant.id}>
        {plant.common_name}
        <button type="button" onClick={() => onHandler(plant)}>
          {button}
        </button>
      </li>
      :
      null
    );
  }

  return (
    <li key={plant.id} onClick={() => onHandler(plant)}>
      {plant.id}
    </li>
  );
}
export default PlantListItem;