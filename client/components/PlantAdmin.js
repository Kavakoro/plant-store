import axios from 'axios';
import React from 'react';
import '../../public/PlantAdmin.css';
import { Link } from 'react-router-dom';

export class PlantAdmin extends React.Component {
  constructor() {
    super();
    this.state = { plants: [] };
  }

  async componentDidMount() {
    let plants = (await axios.get('/api/plants')).data;
    plants = plants.sort((a, b) => a.id - b.id);
    this.setState({ plants });
  }

  render() {
    const { plants } = this.state;
    //console.log(plants, 'plants');
    if (!plants.length) return null;
    return (
      <div id="admin-db">
        <h1>Plant Database</h1>
        <small id="add-button">
          <button className="add-button">
            <Link to={`/admin/Plants/CreatePlant`}> Add a Plant </Link>
          </button>
        </small>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th className="name">Name</th>
              <th className="description">Description</th>
              <th className="size">Size</th>
              <th className="light">Light</th>
              <th>Difficulty</th>
              <th>Pet-Friendly</th>
              <th>Air Cleaner</th>
              <th>Img Src</th>
              <th className="price">Price</th>
              <th>Inventory</th>
            </tr>
          </thead>
          <tbody>
            {plants.map((plant, idx) => (
              <tr key={idx}>
                <td className="id">{plant.id}</td>
                <td>{plant.name}</td>
                <td>{plant.description}</td>
                <td>{plant.size}</td>
                <td>{plant.light}</td>
                <td>{plant.difficulty}</td>
                <td>{plant.petFriendly}</td>
                <td>{plant.airCleaner}</td>
                <td>{plant.img}</td>
                <td className="price">${plant.price}</td>
                <td className="inventory">{plant.inventory}</td>
                <td>
                  <Link to={`/admin/Plants/update/${plant.id}`}>
                    <button>Edit</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
