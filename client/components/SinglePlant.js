import React from 'react';
import { connect } from 'react-redux';
import '../../public/SinglePlant.css';
import { setPlant } from '../store/singlePlant';
// import { Link } from "react-router-dom";
import AddToCart from './AddToCart';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

// const buttonTheme = createMuiTheme({
//   palette: {
//     primary: {
//       // Purple and green play nicely together.
//       main: green[900],
//     },
//   },
// });

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
          </div>
          <div>
            <p>{plant.description}</p>
            <ul>
              <li>{plant.size}</li>
              <li>{plant.price}</li>
            </ul>
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
