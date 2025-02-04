import axios from 'axios';
import React from 'react';
import '../../public/PlantAdmin.css';
import { Link } from 'react-router-dom';

export class OrderAdmin extends React.Component {
  constructor() {
    super();
    this.state = { orders: [] };
  }

  async componentDidMount() {
    const orders = (await axios.get('/api/orders')).data;
    this.setState({ orders });
  }

  render() {
    let orders = this.state.orders.sort((a, b) => a.id.localeCompare(b.id));
    if (!orders.length) return null;
    return (
      <div id="admin-db">
        <h1>Order Database</h1>
        <table className="orders">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ship To</th>
              <th className="address">Street Address</th>
              <th className="address">City</th>
              <th>State</th>
              <th>Zip Code</th>
              <th>Fulfilled?</th>
              <th className="status">
                Order Total <br />
                <span>(completed orders)</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx}>
                <td>{order.id}</td>
                <td>{order.shipTo}</td>
                <td>{order.streetAddress}</td>
                <td className="status">{order.city}</td>
                <td className="status">{order.state}</td>
                <td className="status">{order.zipCode}</td>
                <td className="status">{order.fullfilled ? 'yes' : 'no'}</td>
                <td className="status">${order.total}</td>
                <td className="status">
                  <Link to={`/admin/Orders/update/${order.id}`}>
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
