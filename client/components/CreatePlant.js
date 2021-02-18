import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPlant } from '../store/plants';
import Button from '@material-ui/core/Button';
import '../../public/UpdatePlant.css';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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
      <div id="update-plant">
        <form id="update-form" onSubmit={onSubmit}>
          <h1 id="update-heading">Add Plant Details</h1>
          <TextField
            id="standard-basic"
            name="name"
            label="Plant Name"
            value={name}
            variant="outlined"
            onChange={onChange}
          ></TextField>
          <TextField
            id="standard-basic"
            name="description"
            label="Plant Description"
            value={description}
            variant="outlined"
            onChange={onChange}
          ></TextField>
          <InputLabel id="plant-size">Plant Size</InputLabel>
          <Select
            labelId="plant-size"
            value={size}
            id="plant-size-select"
            name="size"
            onChange={onChange}
          >
            <MenuItem value={one}>
              1 - Small (7" - 15" tall including ecopot)
            </MenuItem>
            <MenuItem value={two}>
              2 - Medium (16" - 26" tall including ecopot)
            </MenuItem>
            <MenuItem value={three}>
              3 - Large (27"-40" tall including ecopot)
            </MenuItem>
            <MenuItem value={four}>
              4 - Extra Large (41"-58" tall including ecopot)
            </MenuItem>
          </Select>

          <InputLabel id="plant-lighting">Plant Lighting</InputLabel>
          <Select
            labelId="plant-lighting"
            value={light}
            id="plant-lighting-select"
            name="light"
            onChange={onChange}
          >
            <MenuItem value={one}>
              1 - 'Low to Partial — Low to bright indirect light'
            </MenuItem>
            <MenuItem value={two}>
              2 - 'Medium — Bright indirect light'
            </MenuItem>
            <MenuItem value={three}>
              3 - 'Partial to Bright — Bright indirect to full sun'
            </MenuItem>
          </Select>
          <InputLabel id="plant-difficulty">Plant Difficulty</InputLabel>
          <Select
            labelId="plant-difficulty"
            value={difficulty}
            id="plant-difficulty-select"
            name="difficulty"
            onChange={onChange}
          >
            <MenuItem value={one}>1 - 'No-fuss — Carefree'</MenuItem>
            <MenuItem value={two}>
              2 - 'Easy — Relatively low maintenance'
            </MenuItem>
            <MenuItem value={three}>
              3 - 'Moderate — Needs a bit of extra care'
            </MenuItem>
          </Select>
          <InputLabel id="pet-friendliness">Pet Friendly?</InputLabel>
          <Select
            labelId="pet-friendliness"
            value={petFriendly}
            id="pet-friendly-select"
            name="petFriendly"
            onChange={onChange}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
          <InputLabel id="air-cleanliness">Air Cleaner?</InputLabel>
          <Select
            labelId="air-cleanliness"
            value={airCleaner}
            id="air-cleanliness"
            name="airCleaner"
            onChange={onChange}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
          <InputLabel id="plant-image">Plant Image Source</InputLabel>

          <TextField
            id="plant-image"
            name="img"
            value={img}
            onChange={onChange}
          ></TextField>

          <InputLabel id="plant-price">Plant Price</InputLabel>

          <TextField
            id="plant-price"
            name="price"
            value={price}
            onChange={onChange}
          ></TextField>

          <InputLabel id="inventory">Plant Inventory</InputLabel>

          <TextField
            id="inventory"
            name="inventory"
            value={inventory}
            onChange={onChange}
          ></TextField>

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
            style={
              ({ height: '2em' },
              { width: '5rem' },
              { margin: '3rem' },
              { backgroundColor: '#abd4a8' })
            }
          >
            Save Changes
          </Button>
        </form>
      </div>
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
