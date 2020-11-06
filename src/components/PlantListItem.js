import React from 'react';
import { Link } from 'react-router-dom';

const PlantListItem = ({ plant, button }) => {
  const main_species = plant.data ? plant.data.main_species : plant;

  return (main_species.common_name ? 
    <li>
      <Link to={
        {
          pathname: "/plant",
          state: {
            plant: main_species,
            button: button,
          }
        }
      }>
        {main_species.common_name}
      </Link>
    </li>
    :
    null
  );
}
export default PlantListItem;