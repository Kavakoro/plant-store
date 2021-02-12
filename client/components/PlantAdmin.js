import axios from 'axios';
import React from 'react';
import '../../public/PlantAdmin.css';

export class PlantAdmin extends React.Component {
  constructor() {
    super();
    this.state = { plants: [] };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const plants = (await axios.get('/api/plants')).data;
    console.log(plants, 'plants');
    this.setState({ plants });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { plants } = this.state;
    if (!plants.length) return null;
    return (
      <div id="plant-admin">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th className="name">Name</th>
              <th className="description">Description</th>
              <th className="size">Size</th>
              <th>Size-Filter</th>
              <th className="price">Price</th>
              <th className="light">Light</th>
              <th className="filter">Light Filter</th>
              <th>Difficulty</th>
              <th className="filter">Diff.Filter</th>
              <th>Pet-Friendly</th>
              <th className="filter">Pet Filter</th>
              <th>Air Cleaner</th>
              <th>Image Source</th>
              <th>Inventory</th>
            </tr>
          </thead>
          <tbody>
            {plants.map((plant, idx) => (
              <tr key={idx}>
                <td>{plant.id}</td>
                <td>{plant.name}</td>
                <td>{plant.description}</td>
                <td>{plant.size}</td>
                <td>{plant.sizeFilter}</td>
                <td>{plant.price}</td>
                <td>{plant.light}</td>
                <td>{plant.lightFilter}</td>
                <td>{plant.difficulty}</td>
                <td>{plant.difficultyFilter}</td>
                <td>{plant.petFriendly}</td>
                <td>{plant.petFilter}</td>
                <td>{plant.airCleaner}</td>
                <td>{plant.img}</td>
                <td>{plant.inventory}</td>

                <td>
                  <button>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
