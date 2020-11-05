import React from 'react';

const PlantListItem = ({ plant, onHandler, button }) => {
  const main_species = plant.data ? plant.data.main_species : plant;
  
  if (button) {
    return (main_species.common_name ? 
      <li>
        {main_species.common_name}
        <button type="button" onClick={() => onHandler(plant)}>
          {button}
        </button>
      </li>
      :
      null
    );
  }

  return (
    <li onClick={() => onHandler(plant)}>
      {main_species.common_name}
    </li>
  );
}
export default PlantListItem;