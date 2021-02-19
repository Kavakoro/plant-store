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
            <h1>{plant.name}</h1>

            <img src={plant.img} />

            <p>${plant.price}</p>
            <p>
              <b>Free shipping on orders over $75.</b>
            </p>
          </div>
          <div>
            <h2>Description</h2>
            <p>{plant.description}</p>
            <div id="details">
              <h2>Details & Care</h2>
              <ul>
                <li>
                  PLANT SIZE: <b>{plant.size}</b>{" "}
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
                <li>
                  Ecopots pot (made from up to 80% recycled plastic) and saucer
                </li>
                <li>All the tips and tricks for expert-level care</li>
              </ul>
            </div>

            <div id="guranteed">
              <h2>Living Room Ready</h2>
              <p>
                Unlike buying a plant from a box store, your Karakovo plant
                arrives fully-grown as pictured and pre-potted. We’ve spent a
                lot of time selecting pots that have optimal drainage, look
                great, and come with a saucer so your floor or desk won’t get
                ruined. All you have to do is unpack your plant and find the
                perfect spot for it in your home.
              </p>
            </div>
            <div id="guranteed">
              <h2>Fully Grown {"&&"} Healthy</h2>
              <p>
                Most of the time when you buy houseplants, they are partially
                grown and kept in less than ideal conditions. With Karakovo, our
                houseplants are grown and cared for in our greenhouses by plant
                experts until the day we ship them to you. That way, your plants
                arrive fully-grown, healthy, and ready for you to enjoy.
              </p>
            </div>
            <div id="guranteed">
              <h2>Guarantee</h2>
              <p>
                If your plant dies within 30 days, we’ll replace it for free.{" "}
                <Link to="/return-policy">
                  <b>learn more</b>
                </Link>
              </p>
            </div>
            <div id="guranteed">
              <h2>Free Shipping</h2>
              <p>
                Free shipping on orders over $75.{" "}
                <Link to="/shipping-info">learn more</Link>
              </p>
              <p>Plastic-free packaging</p>
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
