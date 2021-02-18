import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import '../../public/PastOrders.css';
const token = window.localStorage.getItem('token');
import { Link } from 'react-router-dom';

class _PastOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orders: [] };
  }
  async componentDidMount() {
    console.log(this.props, 'this.props');
    const orders = (
      await axios.get(`/api/users/${this.props.auth.id}/orders`, {
        headers: {
          authorization: token,
        },
      })
    ).data;
    this.setState({ orders: orders });
  }
  render() {
    const { orders } = this.state;
    console.log(orders, 'orders');
    if (!orders.length) {
      return (
        <div id="orders">
          <p>You have no past orders to display</p>
        </div>
      );
    } else {
      return (
        <div id="orders">
          <span>
            <h1>Past Orders</h1>
          </span>
          {orders.map((order, idx) => (
            <div key={idx} id="single-order">
              <ul>
                <Link to={`/account/orders/${order.id}`}>
                  <li>Order # {order.id}</li>
                </Link>
              </ul>
            </div>
          ))}
        </div>
      );
    }
  }
}
//   useEffect(() => {
//     const getOrders = async () => {
//   const orders = (
//     await axios.get(`/api/users/${props.auth.id}/orders`, {
//       headers: {
//         authorization: token,
//       },
//     })
//   ).data;
//   const orders = (
//     await axios.get(`/api/orders`, {
//       headers: {
//         authorization: token,
//       },
//     })
//   ).data;
//   return orders;
// };
//     getOrders().then((orders) => setOrders(orders));
//     console.log(orders, 'orders');
//   }, []);

export const PastOrders = connect((state) => state)(_PastOrders);
