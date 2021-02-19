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
      sizeFilters: [],
      lightFilters: [],
      difficultyFilters: [],
      priceSort: [],
    };

    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    await this.props.getPlants();
  }

  onChange(ev) {
    let array = [...this.state[ev.target.name]];
    if (this.state[ev.target.name].includes(ev.target.value * 1)) {
      let valueIndex = array.indexOf(ev.target.value * 1);
      array.splice(valueIndex, 1);
    } else {
      array.push(ev.target.value * 1);
    }

    this.setState({ [ev.target.name]: array });
  }

  render() {
    const orderId = this.props.cart.id;
    const { plants } = this.props;

    const {
      sizeFilters,
      lightFilters,
      difficultyFilters,
      priceSort,
    } = this.state;

    let filteredPlants = [];

    if (sizeFilters.length) {
      sizeFilters.forEach((num) => {
        const _plants = plants.filter((plant) => {
          return (
            plant.size === num &&
            !JSON.stringify(filteredPlants).includes(JSON.stringify(plant))
          );
        });
        filteredPlants = [...filteredPlants, ..._plants];
      });
    }

    if (lightFilters.length) {
      lightFilters.forEach((num) => {
        const _plants = plants.filter((plant) => {
          return (
            plant.light === num &&
            !JSON.stringify(filteredPlants).includes(JSON.stringify(plant))
          );
        });
        filteredPlants = [...filteredPlants, ..._plants];
      });
    }

    if (difficultyFilters.length) {
      difficultyFilters.forEach((num) => {
        const _plants = plants.filter((plant) => {
          return (
            plant.difficulty === num &&
            !JSON.stringify(filteredPlants).includes(JSON.stringify(plant))
          );
        });
        filteredPlants = [...filteredPlants, ..._plants];
      });
    }

    if (priceSort) {
      if (priceSort.includes(1)) {
        //lowToHigh
        filteredPlants.sort((a, b) => a.price - b.price);
      }
      if (priceSort.includes(2)) {
        //HighToLow
        filteredPlants.sort((a, b) => b.price - a.price);
      }
    }

    if (!this.props.plants) {
      return null;
    } else {
      if (!filteredPlants.length) {
        filteredPlants = plants;
      }
      if (priceSort) {
        if (priceSort.includes(1)) {
          //lowToHigh
          filteredPlants.sort((a, b) => a.price - b.price);
        }
        if (priceSort.includes(2)) {
          //HighToLow
          filteredPlants.sort((a, b) => b.price - a.price);
        }
      }
      return (
        <div className="all-plants-wrapper div-row">
          <div className="filterDiv">
            <form className="filter-form">
              <h1>Shop All Plants</h1>

              <h3>Size</h3>
              <label className="filter-label">
                <input
                  type="checkbox"
                  name="sizeFilters"
                  value={1}
                  onChange={this.onChange}
                />{' '}
                Small
              </label>
              <label className="filter-label">
                <input
                  type="checkbox"
                  name="sizeFilters"
                  value={2}
                  onChange={this.onChange}
                />{' '}
                Medium
              </label>
              <label className="filter-label">
                <input
                  type="checkbox"
                  name="sizeFilters"
                  value={3}
                  onChange={this.onChange}
                />{' '}
                Large
              </label>
              <label className="filter-label">
                <input
                  type="checkbox"
                  name="sizeFilters"
                  value={4}
                  onChange={this.onChange}
                />{' '}
                Extra Large
              </label>
              <br></br>

              <h3>Light</h3>
              <label className="filter-label">
                <input
                  type="checkbox"
                  name="lightFilters"
                  value={1}
                  onChange={this.onChange}
                />{' '}
                Low to Partial
              </label>
              <label className="filter-label">
                <input
                  type="checkbox"
                  name="lightFilters"
                  value={2}
                  onChange={this.onChange}
                />{' '}
                Medium - Bright (Indirect)
              </label>
              <label className="filter-label">
                <input
                  type="checkbox"
                  name="lightFilters"
                  value={3}
                  onChange={this.onChange}
                />{' '}
                Bright
              </label>
              <br></br>

              <h3>Difficulty</h3>
              <label className="filter-label">
                <input
                  type="checkbox"
                  name="difficultyFilters"
                  value={1}
                  onChange={this.onChange}
                />{' '}
                No Fuss - Carefree
              </label>
              <label className="filter-label">
                <input
                  type="checkbox"
                  name="difficultyFilters"
                  value={2}
                  onChange={this.onChange}
                />{' '}
                Easy
              </label>
              <label className="filter-label">
                <input
                  type="checkbox"
                  name="difficultyFilters"
                  value={3}
                  onChange={this.onChange}
                />{' '}
                Moderate
              </label>
              <br></br>
              <h3>Price</h3>
              <label className="filter-label">
                <input
                  type="checkbox"
                  name="priceSort"
                  value={1}
                  disabled={priceSort.includes(2)}
                  onChange={this.onChange}
                />{' '}
                Low to High
              </label>
              <label className="filter-label">
                <input
                  type="checkbox"
                  name="priceSort"
                  value={2}
                  disabled={priceSort.includes(1)}
                  onChange={this.onChange}
                />{' '}
                High to Low
              </label>
            </form>
          </div>

          <div id="all-plants">
            {filteredPlants.map((plant, idx) => (
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
