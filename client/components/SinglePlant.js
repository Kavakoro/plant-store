import React from "react";
import { connect } from "react-redux";
import "../../public/SinglePlant.css";
import { setPlant } from "../store/singlePlant";
// import { updateCart } from "../store/cart";
import AddToCart from "./AddToCart";
import { Link } from "react-router-dom";

class SinglePlant extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    this.props.setPlant(this.props.match.params.plantId * 1);
  }

  render() {
    const { plant, updateCart, orderId, plantId, quantity } = this.props;
    let id = this.props.match.params.plantId * 1;

    console.log(this.props);
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

const mapDispatch = (dispatch, orderId, plantId, quantity) => {
  return {
    setPlant: (id) => dispatch(setPlant(id)),
    // updateCart: (orderId, plantId, quantity) =>
    //   dispatch(updateCart(orderId, plantId, quantity)),
  };
};

export default connect((state) => state, mapDispatch)(SinglePlant);
