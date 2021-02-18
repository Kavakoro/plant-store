import React from 'react';
import { connect } from 'react-redux';
import '../../public/AllPlants.css';
import '../../public/Filter.css';
import { fetchPlants } from '../store/plants';
import { Link } from 'react-router-dom';
import AddToCart from './AddToCart';
import { Filter } from './Filter';
import { StepLabel } from '@material-ui/core';

class AllPlants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //filteredPlants: [],
      sizeFilterSmall: '',
      sizeFilterMedium: '',
      sizeFilterLarge: '',
      sizeFilterExtraLarge: '',
      lightFilterLow: '',
      lightFilterMedium: '',
      lightFilterBright: '',
      difficultyFilterNoFuss: '',
      difficultyFilterEasy: '',
      difficultyFilterModerate: '',
      priceFilterLow: '',
      priceFilterHigh: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    await this.props.getPlants();
    // this.setState({
    //   filteredPlants: this.props.plants,
    // });
    console.log('props', this.props);
  }

  onChange(ev) {
    let change = {};
    change[ev.target.name] =
      this.state[ev.target.name] === '' ? ev.target.value : '';
    //console.log('onChange: ', change);
    this.setState(change);
  }

  render() {
    console.log('state:', this.state);
    const orderId = this.props.cart.id;
    const { plants } = this.props;
    // const { filteredPlants } = this.state;

    //create filter functions to filter or sort plants
    let filteredPlants = [...this.props.plants];
    if (this.state.sizeFilterSmall === '') {
    }

    if (!this.props.plants) {
      return null;
    } else {
      return (
        <div className="div-row">
          <div className="filterDiv">
            <span>
              <form className="filter-form">
                <h1>Shop All Plants</h1>
                <h3>Size</h3>
                <label>
                  <input
                    type="checkbox"
                    name="sizeFilterSmall"
                    value={'small'}
                    onChange={this.onChange}
                  />{' '}
                  Small
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="sizeFilterMedium"
                    value="medium"
                    onChange={this.onChange}
                  />{' '}
                  Medium
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="sizeFilterLarge"
                    value="large"
                    onChange={this.onChange}
                  />{' '}
                  Large
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="sizeFilterExtraLarge"
                    value="extraLarge"
                    onChange={this.onChange}
                  />{' '}
                  Extra Large
                </label>
                <br></br>

                <h3>Light</h3>
                <label>
                  <input
                    type="checkbox"
                    name="lightFilterLow"
                    value="lowLight"
                    onChange={this.onChange}
                  />{' '}
                  Low to Partial
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="lightFilterMedium"
                    value="mediumLight"
                    onChange={this.onChange}
                  />{' '}
                  Medium - Bright (Indirect)
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="lightFilterBright"
                    value="brightLight"
                    onChange={this.onChange}
                  />{' '}
                  Large
                </label>
                <br></br>

                <h3>Difficulty</h3>
                <label>
                  <input
                    type="checkbox"
                    name="difficultyFilterNoFuss"
                    value="noFuss"
                    onChange={this.onChange}
                  />{' '}
                  No Fuss - Carefree
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="difficultyFilterEasy"
                    value="easy"
                    onChange={this.onChange}
                  />{' '}
                  Easy
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="difficultyFilterModerate"
                    value="moderate"
                    onChange={this.onChange}
                  />{' '}
                  Moderate
                </label>
                <br></br>
                <h3>Price</h3>
                <label>
                  <input
                    type="checkbox"
                    name="priceFilterLow"
                    value="lowToHigh"
                    onChange={this.onChange}
                  />{' '}
                  Low to High
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="priceFilterHigh"
                    value="highToLow"
                    onChange={this.onChange}
                  />{' '}
                  High to Low
                </label>
              </form>
            </span>
          </div>

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
