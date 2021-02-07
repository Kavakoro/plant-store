import React from 'react';
import '../../public/Cart.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCart, updateCart } from '../store/cart';
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
      price: 127,
    },
    {
      id: 2,
      name: 'Cactus',
      img: 'https://www.loremflickr.com/220/200/houseplant?random=1',
      price: 150,
    },
  ],
  //total can be calcuated in api logic?
  total: 287,
  //quantities can be calculate in api logic and attached to cart obj before being sent back
  quantities: {
    Fern: 1,
    Cactus: 1,
  },
};

const id = 1; // hard-coded data for testing

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //make call to fetch cart here -  (if user known to us, api will return their cart; if not, api can return a cart object with
    // no plants, etc
    //if guest/user in localStorage, query db for that user's cart, etc)
    // const { id } = this.props.auth;
    if (id) {
      this.props.getCart(id);
    }
  }
  render() {
    // const { plants } = cartObj; //hard-coded data for now
    const { cart } = this.props;
    const { plants, quantities, orderId } = cart;

    if (!plants) {
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
                              quantities[plant.name]--
                            )
                          }
                        >
                          -{' '}
                        </span>
                      </strong>
                      <input
                        value={quantities[plant.name]}
                        readOnly={true}
                        type="number"
                      />
                      <strong>
                        <span
                          onClick={() =>
                            this.props.updateCart(
                              orderId,
                              plant.id,
                              quantities[plant.name]++
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
                      onClick={() =>
                        this.props.updateCart(orderId, plant.id, 0)
                      }
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
              <span>${cart.total.toFixed(2)}</span>
            </div>
            <div className="checkout">
              <button>CHECKOUT</button>
            </div>
          </div>
        </div>
      );
    }
  }
}

// const mapState = (state) => {
//   const { auth } = state;
//   return { auth };
// };

const mapDispatch = (dispatch) => {
  return {
    getCart: (id) => dispatch(fetchCart(id)),
    updateCart: (orderId, plantId, quantity) =>
      dispatch(updateCart(orderId, plantId, quantity)),
  };
};

export default connect((state) => state, mapDispatch)(Cart);
