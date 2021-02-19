import React, { Component } from "react";
import { connect } from "react-redux";
import { updatePlant, setPlant } from "../store/singlePlant";
import { destroyPlant } from "../store/plants";
import "../../public/UpdatePlant.css";
import Button from "@material-ui/core/Button";
import { Divider } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

class UpdatePlant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.plant.id ? this.props.plant.name : "",
      description: this.props.plant.id ? this.props.plant.description : "",
      size: this.props.plant.id ? this.props.plant.size : "",
      light: this.props.plant.id ? this.props.plant.light : "",
      difficulty: this.props.plant.id ? this.props.plant.difficulty : "",
      petFriendly: this.props.plant.id ? this.props.plant.petFriendly : "",
      airCleaner: this.props.plant.id ? this.props.plant.airCleaner : "",
      img: this.props.plant.id ? this.props.plant.img : "",
      price: this.props.plant.id ? this.props.plant.price : "",
      inventory: this.props.plant.id ? this.props.plant.inventory : "",
      error: "",
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
      console.log("this is er", er);
      console.log(er.response.data, "er.response.data");
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
      <div>
        <div className="heading row">
          <h1>Update Plant Details</h1>
          <button
            id="delete-button"
            onClick={() => {
              const result = confirm(
                "Are you sure you want to delete this plant? Information will be deleted from database."
              );
              if (result) {
                destroy(plant.id);
              }
            }}
          >
            Delete
          </button>
        </div>
        <form id="update-form" onSubmit={onSubmit}>
          <InputLabel id="name"> Plant Name</InputLabel>
          <TextField
            name="name"
            value={name}
            onChange={onChange}
            variant="outlined"
          ></TextField>

          <InputLabel id="description"> description</InputLabel>
          <TextField
            name="description"
            value={description}
            onChange={onChange}
            variant="outlined"
          ></TextField>

          <InputLabel id="label"> Plant Size</InputLabel>
          <Select labelId="label" name="size" value={size} onChange={onChange}>
            <MenuItem value="">--choose an option--</MenuItem>
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
          <InputLabel id="plant-light"> Plant light</InputLabel>
          <Select
            labelId="plant-light"
            name="light"
            value={light}
            onChange={onChange}
          >
            <MenuItem value="">--choose an option--</MenuItem>
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

          <InputLabel id="plant-difficulty"> Plant Difficulty</InputLabel>
          <Select
            labelId="plant-difficulty"
            name="difficulty"
            value={difficulty}
            onChange={onChange}
          >
            <MenuItem value="">--choose an option--</MenuItem>
            <MenuItem value={one}>1 - 'No-fuss — Carefree'</MenuItem>
            <MenuItem value={two}>
              2 - 'Easy — Relatively low maintenance'
            </MenuItem>
            <MenuItem value={three}>
              3 - 'Moderate — Needs a bit of extra care'
            </MenuItem>
          </Select>

          <InputLabel id="pet-friendly"> Plant's Pet Friendliness</InputLabel>
          <TextField
            name="petFriendly"
            value={petFriendly}
            onChange={onChange}
            variant="outlined"
          ></TextField>

          <InputLabel id="plant-cleanliness">
            Plant's Air Cleanliness
          </InputLabel>
          <TextField
            name="airCleaner"
            value={airCleaner}
            onChange={onChange}
            variant="outlined"
          ></TextField>

          <InputLabel id="plant-image"> Plant Image</InputLabel>
          <TextField
            name="img"
            value={img}
            onChange={onChange}
            variant="outlined"
          ></TextField>

          <InputLabel id="plant-price"> Plant Price</InputLabel>
          <TextField
            name="price"
            value={price}
            onChange={onChange}
            variant="outlined"
          ></TextField>

          <InputLabel id="plant-inventory"> Plant Inventory</InputLabel>
          <TextField
            name="inventory"
            value={inventory}
            onChange={onChange}
            variant="outlined"
          ></TextField>

          <Button
            disabled={(size && light && difficulty) === ""}
            type="submit"
            id="update-button"
            variant="contained"
          >
            Save Changes
          </Button>
        </form>
      </div>
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
    destroy: (id) => {
      dispatch(destroyPlant(id, history));
    },
  };
};
//mapToState;
export default connect((state) => state, mapToDispatch)(UpdatePlant);
