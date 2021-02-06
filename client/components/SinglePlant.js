import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

const SinglePlant = ({
  plant,
  match: {
    params: { id },
  },
}) => {
  id = id * 1;
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
  const plant =
    state.plants.find((plant) => plant.id === otherProps.match.params.id * 1) ||
    {};

  return { plant, history };
};

const mapDispatch = () => {
  return {};
};

export default connect(mapState, mapDispatch)(SinglePlant);
{
}
