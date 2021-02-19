import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import '../../public/PastOrders.css';
const token = window.localStorage.getItem('token');
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class _PastOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orders: [] };
  }
  async componentDidMount() {
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
          <ul>
            {orders.map((order, idx) => (
              <li key={idx} id="single-order">
                <span>Order Number: {order.id}</span>
                <Link to={`/account/orders/${order.id}`}>Order Details</Link>
              </li>
            ))}
          </ul>
          <div>
            <Button
              component={Link}
              to={`/account`}
              variant="contained"
              type="submit"
              style={
                ({ height: '2em' },
                { margin: '3rem' },
                { backgroundColor: '#abd4a8' })
              }
            >{`<< Back to account`}</Button>
          </div>
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
//return orders
//}
//     getOrders().then((orders) => setOrders(orders));
//   }, []);

export const PastOrders = connect((state) => state)(_PastOrders);
