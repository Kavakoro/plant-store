import axios from "axios";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../../public/PastOrders.css";
const token = window.localStorage.getItem("token");

const _PastOrders = (props) => {
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    return await axios.get(`/api/users/${props.auth.id}/orders`, {
      headers: {
        authorization: token,
      },
    });
  };

  useEffect(() => {
    const orders = getOrders();
    setOrders(orders);
  }, []);
  if (!orders.length) {
    return (
      <div id="orders">
        <p>You have no past orders to display</p>
      </div>
    );
  } else {
    return (
      <div id="orders">
        {orders.map((order) => {
          <div id="single-order">
            <Link to={`/account/orders/${order.id}`}>
              <p>Order # {order.id}</p>
            </Link>
            <p></p>
          </div>;
        })}
      </div>
    );
  }
};

export const PastOrders = connect((state) => state)(_PastOrders);
