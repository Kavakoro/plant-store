import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePlant, setPlant } from '../store/singlePlant';
import '../../public/UpdatePlant.css';

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
    //check if you have props
    //console.log(this.props.plant);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  //not sure if i should be mounting the state or if this is correct?
  componentDidMount() {
    this.props.setPlant(this.props.match.params.plantId * 1);
    console.log(this.props.match.params.plantId * 1);
  }

  componentDidUpdate(prevProps) {
    console.log('is this running');

    if (!prevProps.plant.id && this.props.plant.id) {
      this.setState(
        { name: this.props.plant.name },
        { description: this.props.plant.description },
        { size: this.props.plant.size },
        { sizeFilter: this.props.plant.sizeFilter },
        { light: this.props.plant.light },
        { lightFilter: this.props.plant.lightFilter },
        { difficulty: this.props.plant.difficulty },
        { difficultyFilter: this.props.plant.difficultyFilter },
        { petFriendly: this.props.plant.petFriendly },
        { petFilter: this.props.plant.petFilter },
        { airCleaner: this.props.plant.airCleaner },
        { img: this.props.plant.img },
        { price: this.props.plant.price },
        { inventory: this.props.plant.inventory }
      );
      //console.log(this.state.name);
    }

    //console.log(this.props);
    //console.log('this is props', this.props);
  }

  async onSubmit(ev) {
    ev.preventDefault();
    try {
      //the id is this.props.plant.id and updating with the new state name
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
      //update error state to the below error
      console.log('this is er', er);
      //this.setState({ error: er.response.data.error });
    }
    console.log('state', this.state);
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
      error,
    } = this.state;
    const { onChange, onSubmit } = this;

    return (
      <form id="update" onSubmit={onSubmit}>
        <p>
          <label>Plant Name</label>
          <input name="name" value={name} onChange={onChange} />
        </p>
        <p>
          <label>Plant Description</label>
          <input name="description" value={description} onChange={onChange} />
        </p>
        <div id="update">
          <p>
            <label>Plant Size</label>
            <input name="size" value={size} onChange={onChange} />
          </p>
          <p>
            <label>Size Filter</label>
            <input name="sizeFilter" value={sizeFilter} onChange={onChange} />
          </p>
        </div>
        <div id="update">
          <p>
            <label>Plant Lighting</label>
            <input name="light" value={light} onChange={onChange} />
          </p>
          <p>
            <label>Light Filter</label>
            <input name="lightFilter" value={lightFilter} onChange={onChange} />
          </p>
        </div>
        <div id="update">
          <p>
            <label>Plant Difficulty</label>
            <input name="difficulty" value={difficulty} onChange={onChange} />
          </p>
          <p>
            <label>Difficulty Filter</label>
            <input
              name="difficultyFilter"
              value={difficultyFilter}
              onChange={onChange}
            />
          </p>
        </div>
        <div id="update">
          <p>
            <label>Plant's Pet Friendliness</label>
            <input name="petFriendly" value={petFriendly} onChange={onChange} />
          </p>
          <p>
            <label>Pet Friendly Filter</label>
            <input name="petFilter" value={petFilter} onChange={onChange} />
          </p>
        </div>

        <p>
          <label>Plant's Air Cleanliness</label>
          <input name="airCleaner" value={airCleaner} onChange={onChange} />
        </p>
        <p>
          <label>Plant Image</label>
          <input name="img" value={img} onChange={onChange} />
        </p>
        <p>
          <label>Plant Price</label>
          <input name="price" value={price} onChange={onChange} />
        </p>
        <p>
          <label>Plant inventory</label>
          <input name="inventory" value={inventory} onChange={onChange} />
        </p>

        <button id="update">Save Changes</button>
      </form>
    );
  }
}

// const mapToState = (state, otherProps) => {
//   console.log('hi');
//   //otherProps is helping us get the browser information to match with the user.id
//   //if you find the id, then use it, if not return an empty object
//   const plant =
//     state.plants.find((plant) => plant.id === otherProps.match.params.id * 1) ||
//     {};
//   return { plant };
// };

const mapToDispatch = (dispatch, { history }) => {
  console.log('this is history', history);
  console.log('props', this.props);
  return {
    setPlant: (id) => dispatch(setPlant(id)),
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

export default connect(((state) => state, mapToDispatch))(UpdatePlant);
