import axios from 'axios';
import React from 'react';

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
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {plants.map((plant, idx) => (
              <tr key={idx}>
                <td>{plant.id}</td>
                <td>{plant.name}</td>
                <td>{plant.price}</td>
                <td>{plant.description}</td>
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
