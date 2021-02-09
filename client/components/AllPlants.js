import React from "react";
import { connect } from "react-redux";
import "../../public/AllPlants.css";
import { fetchPlants } from "../store/plants";
import { Link } from "react-router-dom";

/* export const plants = [
  {
    name: "'ena'ena",
    id: 1,
    imageUrl: 'https://loremflickr.com/325/390/houseplant?random=5',
    price: '98.35',
    description: 'Duis mattis egestas metus. Aenean fermentum.',
  },
  {
    name: 'Needle Lichen',
    id: 2,
    imageUrl:
      'https://loremflickr.com/cache/resized/65535_49692144761_315d398271_325_390_nofilter.jpg',
    price: '19.97',
    description: 'Integer ac leo.',
  },
  {
    name: 'Cratoneuron Moss',
    id: 3,
    imageUrl: 'https://loremflickr.com/325/390/houseplant?random=6',
    price: '0',
    description: 'Aliquam sit amet diam in magna bibendum imperdiet.',
  },
  {
    name: "Gregg's Tube Tongue",
    id: 4,
    imageUrl: 'https://loremflickr.com/325/390/houseplant?random=7',
    price: '37.34',
    description: 'Morbi porttitor lorem id ligula.',
  },
  {
    name: 'Queen Of The Meadow',
    id: 5,
    imageUrl: 'https://loremflickr.com/325/390/houseplant?random=8',
    price: '12.00',
    description: 'https://loremflickr.com/325/390/houseplant?random=9',
  },
  {
    name: 'Dusty Miller',
    id: 6,
    imageUrl: 'https://loremflickr.com/325/390/houseplant?random=1',
    price: '6.74',
    description: 'Etiam pretium iaculis justo.',
  },
  {
    name: 'Pacific Tube Lichen',
    id: 9,
    imageUrl: 'https://loremflickr.com/325/390/houseplant?random=2',
    price: '10.50',
    description: 'Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
  },
  {
    name: 'Washington Fescue',
    id: 7,
    imageUrl: 'https://loremflickr.com/325/390/houseplant?random=3',
    price: '13.45',
    description: 'Sed sagittis.',
  },
  {
    name: 'Sweetsultan',
    id: 8,
    imageUrl: 'https://loremflickr.com/325/390/houseplant?random=4',
    price: '59.00',
    description:
      'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula.',
  },
]; */

class AllPlants extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    await this.props.getPlants();
  }

  render() {
    const { toggleButton } = this;
    const { plants } = this.props;
    if (!this.props.plants) {
      return null;
    } else {
      return (
        <div id="all-plants">
          {plants.map((plant, idx) => (
            <div key={idx}>
              <button>Add To Cart</button>
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
