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
    const { orders } = this.state;
    if (!orders.length) return null;
    return (
      <div id="admin-db">
        <h1>Order Database</h1>
        <table className="orders">
          <thead>
            <tr>
              <th>ID</th>
              <th className="address">Street Address</th>
              <th>Fulfilled?</th>
              <th>
                Order Total <span>(completed orders)</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx}>
                <td>{order.id}</td>
                <td>{order.shippingAddress}</td>
                <td className="status">{order.fulfilled ? 'yes' : 'no'}</td>
                <td>{order.total}</td>
                <td>
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
