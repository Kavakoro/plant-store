import React from 'react';
import '../../public/Cart.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCart, updateCart, createCart, deleteItem } from '../store/cart';
import auth from '../store/auth';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.getSubtotal = this.getSubtotal.bind(this);
  }
  getSubtotal() {
    const { plants } = this.props.cart;
    if (plants.length) {
      return plants
        .map((plant) => plant.price * plant.lineitem.amount)
        .reduce((a, b) => a + b)
        .toFixed(2);
    }
  }

  componentDidMount() {
    const cart = this.props.cart;
    if (!cart) {
      const orderId = window.localStorage.getItem('orderId');
      this.props.getCart(orderId, this.props.auth.id);
    }
  }

  render() {
    const { cart } = this.props;
    const { plants } = cart;
    const orderId = cart.id;

    if (!plants.length) {
      return (
        <div id="cart">
          <p>Your cart is empty!</p>
        </div>
      );
    } else {
      return (
        <div id="cart">
          <div id="cart-wrapper">
            <h1>Your Cart</h1>

            {plants.map((plant, idx) => (
              <div id="cart-items" key={idx}>
                <img src={plant.img} />
                <div id="cart-details" className="row">
                  <div className="column space-between">
                    <div>
                      <Link to={`/plants/${plant.id}`}>
                        <h1>{plant.name}</h1>
                      </Link>
                    </div>
                    <div>
                      <strong>
                        <span
                          onClick={() =>
                            this.props.updateCart(
                              orderId,
                              plant.id,
                              plant.lineitem.amount - 1
                            )
                          }
                        >
                          -{' '}
                        </span>
                      </strong>
                      <input
                        readOnly={true}
                        value={plant.lineitem.amount}
                        type="number"
                      />
                      <strong>
                        <span
                          onClick={() =>
                            this.props.updateCart(
                              orderId,
                              plant.id,
                              plant.lineitem.amount + 1
                            )
                          }
                        >
                          +{' '}
                        </span>
                      </strong>
                    </div>
                  </div>
                  <div className="column space-between">
                    <span>${plant.price.toFixed(2)}</span>
                    <button
                      onClick={() => this.props.deleteItem(orderId, plant.id)}
                      className="remove"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <hr></hr>
            <div className="subtotal">
              <strong>
                <span>Order Subtotal: </span>
              </strong>
              <span>${this.getSubtotal()}</span>
            </div>
            <div className="checkout">
              <Link to="/cart/checkout">
                <button>CHECKOUT</button>
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapDispatch = (dispatch) => {
  return {
    getCart: (orderId) => dispatch(fetchCart(orderId, userId)),
    updateCart: (orderId, plantId, amount) =>
      dispatch(updateCart(orderId, plantId, amount)),
    createCart: (userId) => dispatch(createCart(userId)),
    deleteItem: (orderId, plantId) => dispatch(deleteItem(orderId, plantId)),
  };
};

export default connect((state) => state, mapDispatch)(Cart);
