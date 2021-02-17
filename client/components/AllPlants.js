import React from 'react';
import { connect } from 'react-redux';
import '../../public/AllPlants.css';
import { fetchPlants } from '../store/plants';
import { Link } from 'react-router-dom';
import AddToCart from './AddToCart';

class AllPlants extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    await this.props.getPlants();
  }

  render() {
    const { plants } = this.props;
    const orderId = this.props.cart.id;
    if (!this.props.plants) {
      return null;
    } else {
      return (
        <div id="all-plants">
          {plants.map((plant, idx) => (
            <div key={idx}>
              <AddToCart orderId={orderId} plantId={plant.id} />
              <Link to={`/plants/${plant.id}`}>
                <div id="plant-div">
                  <img src={plant.img} />
                  <div>
                    <span>{plant.name}</span>
                    <span>{plant.price}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      );
    }
  }
}

const mapDispatch = (dispatch) => {
  return {
    getPlants: () => dispatch(fetchPlants()),
  };
};

export default connect((state) => state, mapDispatch)(AllPlants);
// export default AllPlants;
