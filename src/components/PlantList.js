import React from 'react';
import PlantListItem from './PlantListItem';

const PlantList = ({ list, button=false }) => {

  return (
      <ul>
      {list.map(plant => (
        <PlantListItem key={list[0].data ? plant.data.id : plant.id} plant={plant} button={button} />
      ))}
    </ul>
  );
}
export default PlantList;