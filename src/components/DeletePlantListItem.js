import React from 'react';

const PlantListItem = ({ plant, onRemove }) => {

  return (
    <li key={plant.id}>
      {plant.plant_id}
      <button type="button" onClick={() => onRemove(plant)}>
        Remove
      </button>
    </li>
  );
}
export default PlantListItem;