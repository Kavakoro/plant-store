import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const token = window.localStorage.getItem('token');

export const _SinglePastOrder = ({ auth, orderId }) => {
  const [order, setOrder] = useState({});
  const [plants, setPlants] = useState([]);
  useEffect(() => {
    async function getOrder() {
      const order = (
        await axios.get(`/api/orders/${orderId}`, {
          headers: { auhorization: token },
        })
      ).data;
      return order;
    }
    getOrder().then((order) => setOrder(order));
  }, []);
  useEffect(() => {
    async function getPlants() {
      const plants = (
        await axios.get(`/api/users/pastorders/${orderId}`, {
          headers: { authorization: token },
        })
      ).data;
      console.log(plants, 'plants');
      return plants;
    }
    getPlants().then((plants) => setPlants(plants));
  }, []);
  console.log(plants, 'plants');
  return (
    <div id="single-past-order">
      <table>
        <tr>
          <th>Order number</th>
          <th>Ship To </th>
          <th>Date Placed</th>
          <th>Total</th>
        </tr>
        <tbody>
          <tr>
            <td>{order.id}</td>
            <td>{order.shipTo}</td>
            <td>{order.createdAt}</td>
            <td>${order.total}</td>
          </tr>
        </tbody>
      </table>
      <div id="plants">
        {plants.map((plant, idx) => (
          <div className="column" key={idx}>
            <img src={plant.img} /> <span>x {plant.lineitem.amount}</span>
          </div>
        ))}
      </div>
      <div>
        <Button
          component={Link}
          to={`/account/orders`}
          variant="contained"
          type="submit"
          style={
            ({ height: '2em' },
            { margin: '3rem' },
            { backgroundColor: '#abd4a8' })
          }
        >
          {`<< Back to orders`}
        </Button>
      </div>
    </div>
  );
};

const mapState = (state, routeProps) => {
  const { orderId } = routeProps.match.params;
  const { auth } = state;
  return { orderId, auth };
};
export const SinglePastOrder = connect(mapState)(_SinglePastOrder);
