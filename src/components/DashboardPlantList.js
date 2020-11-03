import React from 'react';
import PlantListItem from './PlantListItem';

const PlantList = ({ list, onHandler, button=false }) => {
  return (
      <ul>
      {list.map(plant => (
        <PlantListItem key={plant.id} plant={plant} button={button} onHandler={onHandler} />
      ))}
    </ul>
  );
}
export default PlantList;