import React from 'react';
import DeletePlantListItem from './DeletePlantListItem';

const PlantList = ({ list, onRemove }) => {
  console.log(list);
  return (
      <ul>
      {list.map((plant) => (
        <DeletePlantListItem key={plant.id} plant={plant} onRemove={onRemove} />
      ))}
    </ul>
  );
}
export default PlantList;