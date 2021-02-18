import React from "react";
import { connect } from "react-redux";
import "../../public/SinglePlant.css";
import { setPlant } from "../store/singlePlant";
// import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

class SinglePlant extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    await this.props.setPlant(this.props.match.params.plantId * 1);
    //console.log(this.props.match.params.plantId * 1);
  }

  render() {
    const { plant } = this.props;
    const orderId = this.props.cart.id;

    if (!this.props.plant) {
      return null;
    } else {
      return (
        <div id="single-plant">
          <div id="plant-div">
            <img src={plant.img} />
            <h1>{plant.name}</h1>
            <p>${plant.price}</p>
            <p>
              <b>Free shipping on orders over $75.</b>
            </p>
          </div>
          <div>
            <h2>Descrition</h2>
            <p>{plant.description}</p>
            <div id="details">
              <h2>Details & Care</h2>
              <ul>
                <li>
                  PANT SIZE: <b>{plant.size}</b>{" "}
                </li>
                <li>
                  DIFFICULTY: <b>{plant.difficulty}</b>
                </li>
                <li>
                  LIGHT: <b>{plant.light}</b>
                </li>
                <li>
                  PET FRIENDLY: <b>{plant.petFriendly}</b>
                </li>
                <li>
                  AIR CLEANER: <b>{plant.airCleaner}</b>
                </li>
              </ul>
            </div>
            <div id="included">
              <h2>What's Included</h2>
              <ul>
                <li>Healthy plant pre-potted with premium soil</li>
                <li>Ecopots pot and saucerks for expert-level care</li>
              </ul>
            </div>
            <div id="guranteed">
              <h2>Guranteed</h2>
              <p>
                If your plant dies within 30 days, we’ll replace it for free.
              </p>
            </div>
            <p>
              <AddToCart orderId={orderId} plantId={plant.id} />
            </p>
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
