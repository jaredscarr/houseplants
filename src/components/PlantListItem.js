import React from 'react';

const PlantListItem = ({ plant, buttonText, onHandler }) => {

  return (
    <li key={plant.id}>
      {plant.id}
      <button type="button" onClick={() => onHandler(plant)}>
        {buttonText}
      </button>
    </li>
  );
}
export default PlantListItem;