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
    // let filteredPlants = [...this.props.plants];

    const {
      sizeFilterSmall,
      sizeFilterMedium,
      sizeFilterLarge,
      sizeFilterExtraLarge,
      lightFilterLow,
      lightFilterMedium,
      lightFilterBright,
      difficultyFilterNoFuss,
      difficultyFilterEasy,
      difficultyFilterModerate,
      priceFilterLow,
      priceFilterHigh,
    } = this.state;

    //if you add the functions in the with the onChange below,
    // you get an error 'cannot filter of underfined.'
    // i need help passing plants in, or if this is even the right approach
    function sizeFilterFunc(plants) {
      if (sizeFilterSmall === 'small') {
        plants.filter((plant) => plant.size === 1);
      } else {
        plants.filter((plant) => plant.size !== 1);
      }
      if (sizeFilterMedium === 'medium') {
        plants.filter((plant) => plant.size === 2);
      } else {
        plants.filter((plant) => plant.size !== 2);
      }
      if (sizeFilterLarge === 'large') {
        plants.filter((plant) => plant.size === 3);
      } else {
        plants.filter((plant) => plant.size !== 3);
      }
      if (sizeFilterExtraLarge === 'extraLarge') {
        plants.filter((plant) => plant.size === 4);
      } else {
        plants.filter((plant) => plant.size !== 4);
      }
    }

    function lightFilterFunc(plants) {
      if (lightFilterLow === 'lowLight') {
        plants.filter((plant) => plant.light === 1);
      } else {
        plants.filter((plant) => plant.light !== 1);
      }
      if (lightFilterMedium === 'mediumLight') {
        plants.filter((plant) => plant.light === 2);
      } else {
        plants.filter((plant) => plant.light !== 2);
      }
      if (lightFilterBright === 'brightLight') {
        plants.filter((plant) => plant.light === 3);
      } else {
        plants.filter((plant) => plant.light !== 3);
      }
    }

    function difficultyFilterFunc(plants) {
      if (difficultyFilterNoFuss === 'noFuss') {
        plants.filter((plant) => plant.difficulty === 1);
      } else {
        plants.filter((plant) => plant.difficulty !== 1);
      }
      if (difficultyFilterEasy === 'easy') {
        plants.filter((plant) => plant.difficulty === 2);
      } else {
        plants.filter((plant) => plant.difficulty !== 2);
      }
      if (difficultyFilterModerate === 'moderate') {
        plants.filter((plant) => plant.difficulty === 3);
      } else {
        plants.filter((plant) => plant.difficulty !== 3);
      }
    }

    function sortPrice(plants) {
      if (priceFilterLow === 'lowToHigh') {
        plants.sort((a, b) =>
          a.price < b.price
            ? 1
            : a.price === b.price
            ? a.name < b.name
              ? 1
              : -1
            : -1
        );
      } else {
        plants.sort((a, b) =>
          a.price > b.price
            ? 1
            : a.price === b.price
            ? a.name < b.name
              ? 1
              : -1
            : -1
        );
      }
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
                <label className="filter-label">
                  <input
                    type="checkbox"
                    name="sizeFilterSmall"
                    value={'small'}
                    onChange={this.onChange}
                  />{' '}
                  Small
                </label>
                <label className="filter-label">
                  <input
                    type="checkbox"
                    name="sizeFilterMedium"
                    value="medium"
                    onChange={this.onChange}
                  />{' '}
                  Medium
                </label>
                <label className="filter-label">
                  <input
                    type="checkbox"
                    name="sizeFilterLarge"
                    value="large"
                    // i want to add the functions in the onChange below
                    onChange={this.onChange}
                  />{' '}
                  Large
                </label>
                <label className="filter-label">
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
                <label className="filter-label">
                  <input
                    type="checkbox"
                    name="lightFilterLow"
                    value="lowLight"
                    onChange={this.onChange}
                  />{' '}
                  Low to Partial
                </label>
                <label className="filter-label">
                  <input
                    type="checkbox"
                    name="lightFilterMedium"
                    value="mediumLight"
                    onChange={this.onChange}
                  />{' '}
                  Medium - Bright (Indirect)
                </label>
                <label className="filter-label">
                  <input
                    type="checkbox"
                    name="lightFilterBright"
                    value="brightLight"
                    onChange={this.onChange}
                  />{' '}
                  Bright
                </label>
                <br></br>

                <h3>Difficulty</h3>
                <label className="filter-label">
                  <input
                    type="checkbox"
                    name="difficultyFilterNoFuss"
                    value="noFuss"
                    onChange={this.onChange}
                  />{' '}
                  No Fuss - Carefree
                </label>
                <label className="filter-label">
                  <input
                    type="checkbox"
                    name="difficultyFilterEasy"
                    value="easy"
                    onChange={this.onChange}
                  />{' '}
                  Easy
                </label>
                <label className="filter-label">
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
                <label className="filter-label">
                  <input
                    type="checkbox"
                    name="priceFilterLow"
                    value="lowToHigh"
                    disabled={priceFilterHigh !== ''}
                    onChange={this.onChange}
                  />{' '}
                  Low to High
                </label>
                <label className="filter-label">
                  <input
                    type="checkbox"
                    name="priceFilterHigh"
                    value="highToLow"
                    disabled={priceFilterLow !== ''}
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
