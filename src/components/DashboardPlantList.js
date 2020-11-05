import React from 'react';
import PlantListItem from './PlantListItem';

const PlantList = ({ list, onHandler, button=false }) => {

  return (
      <ul>
      {list.map(plant => (
        <PlantListItem key={list[0].data ? plant.data.id : plant.id} plant={plant} button={button} onHandler={onHandler} />
      ))}
    </ul>
  );
}
export default PlantList;