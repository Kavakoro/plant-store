import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePlant, setPlant } from '../store/singlePlant';
import '../../public/UpdatePlant.css';
import Button from '@material-ui/core/Button';

class UpdatePlant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.plant.id ? this.props.plant.name : '',
      description: this.props.plant.id ? this.props.plant.description : '',
      size: this.props.plant.id ? this.props.plant.size : '',
      sizeFilter: this.props.plant.id ? this.props.plant.sizeFilter : '',
      light: this.props.plant.id ? this.props.plant.light : '',
      lightFilter: this.props.plant.id ? this.props.plant.lightFilter : '',
      difficulty: this.props.plant.id ? this.props.plant.difficulty : '',
      difficultyFilter: this.props.plant.id
        ? this.props.plant.difficultyFilter
        : '',
      petFriendly: this.props.plant.id ? this.props.plant.petFriendly : '',
      petFilter: this.props.plant.id ? this.props.plant.petFilter : '',
      airCleaner: this.props.plant.id ? this.props.plant.airCleaner : '',
      img: this.props.plant.id ? this.props.plant.img : '',
      price: this.props.plant.id ? this.props.plant.price : '',
      inventory: this.props.plant.id ? this.props.plant.inventory : '',
      error: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.setPlant(this.props.match.params.plantId * 1);
    this.setState({
      name: this.props.plant.name,
      description: this.props.plant.description,
      size: this.props.plant.size,
      sizeFilter: this.props.plant.sizeFilter,
      light: this.props.plant.light,
      lightFilter: this.props.plant.lightFilter,
      difficulty: this.props.plant.difficulty,
      difficultyFilter: this.props.plant.difficultyFilter,
      petFriendly: this.props.plant.petFriendly,
      petFilter: this.props.plant.petFilter,
      airCleaner: this.props.plant.airCleaner,
      img: this.props.plant.img,
      price: this.props.plant.price,
      inventory: this.props.plant.inventory,
    });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.plant.id && this.props.plant.id) {
      this.setState({
        name: this.props.plant.name,
        description: this.props.plant.description,
        size: this.props.plant.size,
        sizeFilter: this.props.plant.sizeFilter,
        light: this.props.plant.light,
        lightFilter: this.props.plant.lightFilter,
        difficulty: this.props.plant.difficulty,
        difficultyFilter: this.props.plant.difficultyFilter,
        petFriendly: this.props.plant.petFriendly,
        petFilter: this.props.plant.petFilter,
        airCleaner: this.props.plant.airCleaner,
        img: this.props.plant.img,
        price: this.props.plant.price,
        inventory: this.props.plant.inventory,
      });
    }
  }

  async onSubmit(ev) {
    ev.preventDefault();
    try {
      await this.props.update(
        this.props.plant.id,
        this.state.name,
        this.state.description,
        this.state.size,
        this.state.sizeFilter,
        this.state.light,
        this.state.lightFilter,
        this.state.difficulty,
        this.state.difficultyFilter,
        this.state.petFriendly,
        this.state.petFilter,
        this.state.airCleaner,
        this.state.img,
        this.state.price,
        this.state.inventory
      );
    } catch (er) {
      this.setState({ error: er });
    }
  }
  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render() {
    console.log(this.state.error, 'this.state.error');
    const {
      name,
      description,
      size,
      sizeFilter,
      light,
      lightFilter,
      difficulty,
      difficultyFilter,
      petFriendly,
      petFilter,
      airCleaner,
      img,
      price,
      inventory,
    } = this.state;

    const { onChange, onSubmit } = this;

    return (
      <form id="update-form" onSubmit={onSubmit}>
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
        <div id="update-div">
          <p>
            <label id="form-label">Plant Size</label>
            <input
              id="form-input"
              name="size"
              value={size}
              onChange={onChange}
            />
          </p>
          <p>
            <label id="form-label">Size Filter</label>
            <input
              id="form-input"
              name="sizeFilter"
              value={sizeFilter}
              onChange={onChange}
            />
          </p>
        </div>
        <div id="update-div">
          <p>
            <label id="form-label">Plant Lighting</label>
            <input
              id="form-input"
              name="light"
              value={light}
              onChange={onChange}
            />
          </p>
          <p>
            <label id="form-label">Light Filter</label>
            <input
              id="form-input"
              name="lightFilter"
              value={lightFilter}
              onChange={onChange}
            />
          </p>
        </div>
        <div id="update-div">
          <p>
            <label id="form-label">Plant Difficulty</label>
            <input
              id="form-input"
              name="difficulty"
              value={difficulty}
              onChange={onChange}
            />
          </p>
          <p>
            <label id="form-label">Difficulty Filter</label>
            <input
              id="form-input"
              name="difficultyFilter"
              value={difficultyFilter}
              onChange={onChange}
            />
          </p>
        </div>
        <div id="update-div">
          <p>
            <label id="form-label">Plant's Pet Friendliness</label>
            <input
              id="form-input"
              name="petFriendly"
              value={petFriendly}
              onChange={onChange}
            />
          </p>
          <p>
            <label id="form-label">Pet Friendly Filter</label>
            <input
              id="form-input"
              name="petFilter"
              value={petFilter}
              onChange={onChange}
            />
          </p>
        </div>

        <p id="update-p">
          <label id="form-label">Plant's Air Cleanliness</label>
          <input
            id="form-input"
            name="airCleaner"
            value={airCleaner}
            onChange={onChange}
          />
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

        <Button type="submit" id="update-button" variant="contained">
          Save Changes
        </Button>
      </form>
    );
  }
}

const mapToState = (state, otherProps) => {
  const plant = state.plant;
  return { plant };
};

const mapToDispatch = (dispatch, { history }) => {
  return {
    setPlant: (id) => {
      return dispatch(setPlant(id));
    },
    update: (
      id,
      name,
      description,
      size,
      sizeFilter,
      light,
      lightFilter,
      difficulty,
      difficultyFilter,
      petFriendly,
      petFilter,
      airCleaner,
      img,
      price,
      inventory
    ) => {
      return dispatch(
        updatePlant(
          id,
          name,
          description,
          size,
          sizeFilter,
          light,
          lightFilter,
          difficulty,
          difficultyFilter,
          petFriendly,
          petFilter,
          airCleaner,
          img,
          price,
          inventory,
          history
        )
      );
    },
  };
};
mapToState;
export default connect((state) => state, mapToDispatch)(UpdatePlant);
