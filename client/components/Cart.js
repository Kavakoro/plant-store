import React from 'react';
import '../../public/Cart.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCart, updateCart, createCart, deleteItem } from '../store/cart';
import auth from '../store/auth';

//cart will be held in state (redux store) in an object. THe cart will
//reflect the cart of hhe specific user using the site, so it should be an object

//should we have a class method to calculate total on the front end as items are added?
//or should this logic be done on the backend? is it "business logic" ?
// if no items in cart, display alternate message 'there are no items in cart, etc'button: <return to shopping>

//dummy data - export to store to test out store code/logic
export const cartObj = {
  orderId: 2,
  plants: [
    {
      id: 1,
      name: 'Fern',
      img: 'https://www.loremflickr.com/220/200/houseplant',
      price: 120,
      amount: 1,
    },
    {
      id: 2,
      name: 'Cactus',
      img: 'https://www.loremflickr.com/220/200/houseplant?random=1',
      price: 100,
      amount: 1,
    },
  ],
};

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
      this.props.getCart(orderId);
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

// const mapState = (state, otherProps) => {
//   const { auth } = state;
//   return { auth };
// };

const mapDispatch = (dispatch) => {
  return {
    getCart: (orderId) => dispatch(fetchCart(orderId)),
    updateCart: (orderId, plantId, amount) =>
      dispatch(updateCart(orderId, plantId, amount)),
    createCart: (userId) => dispatch(createCart(userId)),
    deleteItem: (orderId, plantId) => dispatch(deleteItem(orderId, plantId)),
  };
};

export default connect((state) => state, mapDispatch)(Cart);
