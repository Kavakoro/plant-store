import React from "react";
import { connect } from "react-redux";
import "../../public/SinglePlant.css";
import { setPlant } from "../store/singlePlant";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

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
            <AddToCart />
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
