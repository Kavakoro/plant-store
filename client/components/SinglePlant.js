import React from 'react';
import { connect } from 'react-redux';
import '../../public/SinglePlant.css';
import { setPlant } from '../store/singlePlant';
import { Link } from 'react-router-dom';
import AddToCart from './AddToCart';

class SinglePlant extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    this.props.setPlant(this.props.match.params.plantId * 1);
    console.log(this.props.match.params.plantId * 1);
  }

  render() {
    const { plant } = this.props;
    const orderId = this.props.cart.id;
    console.log(orderId, 'orderId');

    if (!this.props.plant) {
      return null;
    } else {
      return (
        <div id="single-plant">
          <h1>{plant.name}</h1>
          <p>
            <Link to={`/plants/${plant.id}/update`}>Update Plant</Link>
          </p>
          <div id="plant-div">
            <img src={plant.img} />
          </div>
          <div>
            <p>{plant.description}</p>
            <ul>
              <li>{plant.size}</li>
              <li>{plant.price}</li>
            </ul>
            <AddToCart orderId={orderId} plantId={plant.id} />
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
