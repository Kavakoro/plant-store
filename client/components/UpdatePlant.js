import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePlant, setPlant, destroyPlant } from '../store/singlePlant';
import '../../public/UpdatePlant.css';
import Button from '@material-ui/core/Button';

class UpdatePlant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.plant.id ? this.props.plant.name : '',
      description: this.props.plant.id ? this.props.plant.description : '',
      size: this.props.plant.id ? this.props.plant.size : '',
      light: this.props.plant.id ? this.props.plant.light : '',
      difficulty: this.props.plant.id ? this.props.plant.difficulty : '',
      petFriendly: this.props.plant.id ? this.props.plant.petFriendly : '',
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
      light: this.props.plant.light,
      difficulty: this.props.plant.difficulty,
      petFriendly: this.props.plant.petFriendly,
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
        light: this.props.plant.light,
        difficulty: this.props.plant.difficulty,
        petFriendly: this.props.plant.petFriendly,
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
      console.log(er.response.data, 'er.response.data');
      this.setState({ error: er });
    }
  }
  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
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
    } = this.state;

    //destroying is giving the error about performing a react state update on an unmounted component when we delete a plant?? i think its because of the state/props but im not sure how else to grab plants from state
    const { destroy, plant } = this.props;
    const { onChange, onSubmit } = this;

    const one = 1;
    const two = 2;
    const three = 3;
    const four = 4;

    return (
      <form id="update-form" onSubmit={onSubmit}>
        <h1 id="update-heading">Update Plant Details</h1>
        <small id="delete-button">
          <button
            onClick={() => {
              destroy(plant);
            }}
          >
            Delete Plant
          </button>
        </small>
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
          <input
            id="form-input"
            name="petFriendly"
            value={petFriendly}
            onChange={onChange}
          />
        </p>

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

        <Button
          disabled={(size && light && difficulty) === ''}
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
      light,
      difficulty,
      petFriendly,
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
          light,
          difficulty,
          petFriendly,
          airCleaner,
          img,
          price,
          inventory,
          history
        )
      );
    },
    destroy: (plant) => {
      dispatch(destroyPlant(plant, history));
    },
  };
};
//mapToState;
export default connect((state) => state, mapToDispatch)(UpdatePlant);
