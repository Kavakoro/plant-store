// import React from "react";
// import { connect } from "react-redux";
// import { setPlant } from "./singlePlant";

// import { Link } from "react-router-dom";

// const SinglePlant = ({ plant }) => {
//   console.log(plant, "plant");
//   // if (!plant.id) {
//   //   return null;
//   // }
//   return (
//     <div id="single">
//       <p>Plant details for: {plant.name}</p>
//     </div>
//   );
// };

// const mapState = (state, otherProps, history) => {
//   console.log(otherProps.match.params.plantId, "params id");
// const plant =
//   state.plants.find(
//     (plant) => plant.id === otherProps.match.params.plantId * 1
//   ) || {};
// return { plant };

// };

// const mapDispatch = (dispatch, otherProps) => {
//   id = otherProps.match.params.plantId * 1;
//   return {
//     setPlant: (id) => dispatch(setPlant(id)),
//   };
// };

// export default connect((state) => state, mapDispatch)(SinglePlant);

import React from "react";
import { connect } from "react-redux";
import "../../public/SinglePlant.css";
import { setPlant } from "../store/singlePlant";
import { Link } from "react-router-dom";

class SinglePlant extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    this.props.setPlant(this.props.match.params.plantId * 1);
    console.log(this.props.match.params.plantId * 1);
  }

  render() {
    const { toggleButton } = this;
    const { plant } = this.props;
    // const { id } = this;
    // console.log(plant);
    if (!this.props.plant) {
      return null;
    } else {
      return (
        <div id="single-plant">
          <h1>{plant.name}</h1>
          <div id="plant-div">
            <img src={plant.img} />
          </div>
          <div>
            <p>{plant.description}</p>
            <ul>
              <li>{plant.size}</li>
              <li>{plant.price}</li>
            </ul>
            <button>Add To Cart</button>
          </div>
        </div>
      );
    }
  }
}

const mapDispatch = (dispatch) => {
  return {
    setPlant: (id) => dispatch(setPlant(id)),
  };
};

export default connect((state) => state, mapDispatch)(SinglePlant);
