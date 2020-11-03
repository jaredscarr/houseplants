import React from 'react';
import PlantListItem from './PlantListItem';

const PlantList = ({ list, onHandler, buttonText }) => {
  return (
      <ul>
      {list.map(plant => (
        <PlantListItem key={plant.id} plant={plant} buttonText={buttonText} onHandler={onHandler} />
      ))}
    </ul>
  );
}
export default PlantList;