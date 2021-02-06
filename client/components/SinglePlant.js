import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

const SinglePlant = ({ plant }) => {
  console.log(plant, 'plant');
  if (!plant.id) {
    return null;
  }
  return (
    <div id="single">
      <p>Plant details for: {plant.name}</p>
    </div>
  );
};

const mapState = (state, otherProps, history) => {
  console.log(otherProps.match.params.plantId, 'params id');
  const plant =
    state.plants.find(
      (plant) => plant.id === otherProps.match.params.plantId * 1
    ) || {};
  return { plant };
};

const mapDispatch = () => {
  return {};
};

export default connect(mapState, mapDispatch)(SinglePlant);
