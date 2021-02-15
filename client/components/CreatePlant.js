import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPlant } from '../store/singlePlant';
import Button from '@material-ui/core/Button';
import '../../public/UpdatePlant.css';

class CreatePlant extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      size: '',
      light: '',
      difficulty: '',
      petFriendly: '',
      airCleaner: '',
      img: '/images/yellowcan.jpeg',
      price: '',
      inventory: '',
      error: '',
    };
    console.log('state', this.state);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  async onSubmit(ev) {
    ev.preventDefault();
    //this stops state from refreshing?
    try {
      await this.props.create(
        this.state.name,
        this.state.description,
        this.state.size,
        this.state.light,
        this.state.difficulty,
        this.state.petFriendly,
        this.state.airCleaner,
        this.state.img,
        this.state.price,
        this.state.inventory
      );
    } catch (er) {
      console.log('this is er', er);
      this.setState({ error: er });
    }
    console.log('this is state', this.state);
  }
  render() {
    const {
      name,
      description,
      size,
      light,
      difficulty,
      petFriendly,
      airCleaner,
      img,
      price,
      inventory,
      error,
    } = this.state;

    const { onChange, onSubmit } = this;

    const one = 1;
    const two = 2;
    const three = 3;
    const four = 4;

    return (
      <form id="update-form" onSubmit={onSubmit}>
        <h1 id="update-heading">Add Plant Details</h1>
        <p id="update-p">
          <label id="form-label">Plant Name</label>
          <input id="form-input" name="name" value={name} onChange={onChange} />
        </p>
        <p id="update-p">
          <label id="form-label">Plant Description</label>
          <input
            id="form-input"
            name="description"
            value={description}
            onChange={onChange}
          />
        </p>
        <p id="update-p">
          <label id="form-label">Plant Size</label>
          <select id="form-input" name="size" value={size} onChange={onChange}>
            <option value="">--choose an option--</option>
            <option value={one}>
              1 - Small (7" - 15" tall including ecopot)
            </option>
            <option value={two}>
              2 - Medium (16" - 26" tall including ecopot)
            </option>
            <option value={three}>
              3 - Large (27"-40" tall including ecopot)
            </option>
            <option value={four}>
              4 - Extra Large (41"-58" tall including ecopot)
            </option>
          </select>
        </p>
        <p id="update-p">
          <label id="form-label">Plant Lighting</label>
          <select
            id="form-input"
            name="light"
            value={light}
            onChange={onChange}
          >
            <option value="">--choose an option--</option>
            <option value={one}>
              1 - 'Low to Partial — Low to bright indirect light'
            </option>
            <option value={two}>2 - 'Medium — Bright indirect light'</option>
            <option value={three}>
              3 - 'Partial to Bright — Bright indirect to full sun'
            </option>
          </select>
        </p>
        <p id="update-p">
          <label id="form-label">Plant Difficulty</label>
          <select
            id="form-input"
            name="difficulty"
            value={difficulty}
            onChange={onChange}
          >
            <option value="">--choose an option--</option>
            <option value={one}>1 - 'No-fuss — Carefree'</option>
            <option value={two}>2 - 'Easy — Relatively low maintenance'</option>
            <option value={three}>
              3 - 'Moderate — Needs a bit of extra care'
            </option>
          </select>
        </p>
        <p id="update-p">
          <label id="form-label">Plant's Pet Friendliness</label>
          <select
            id="form-input"
            name="petFriendly"
            value={petFriendly}
            onChange={onChange}
          >
            <option value="">--choose an option--</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </p>

        <p id="update-p">
          <label id="form-label">Plant's Air Cleanliness</label>
          <select
            id="form-input"
            name="airCleaner"
            value={airCleaner}
            onChange={onChange}
          >
            <option value="">--choose an option--</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </p>
        <p id="update-p">
          <label id="form-label">Plant Image</label>
          <input id="form-input" name="img" value={img} onChange={onChange} />
        </p>
        <p id="update-p">
          <label id="form-label">Plant Price</label>
          <input
            id="form-input"
            name="price"
            value={price}
            onChange={onChange}
          />
        </p>
        <p id="update-p">
          <label id="form-label">Plant inventory</label>
          <input
            id="form-input"
            name="inventory"
            value={inventory}
            onChange={onChange}
          />
        </p>

        <Button
          disabled={
            (size &&
              price &&
              inventory &&
              name &&
              description &&
              light &&
              difficulty &&
              petFriendly &&
              airCleaner) === ''
          }
          type="submit"
          id="update-button"
          variant="contained"
        >
          Save Changes
        </Button>
      </form>
    );
  }
}

export default connect(null, (dispatch, { history }) => {
  console.log('history dispatch', history);
  return {
    create: (
      name,
      description,
      size,
      light,
      difficulty,
      petFriendly,
      airCleaner,
      img,
      price,
      inventory
    ) =>
      dispatch(
        createPlant(
          name,
          description,
          size,
          light,
          difficulty,
          petFriendly,
          airCleaner,
          img,
          price,
          inventory,
          history
        )
      ),
  };
})(CreatePlant);
