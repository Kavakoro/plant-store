import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import AppBar from '@material-ui/core/AppBar';
import '../../public/Navbar.css';
import { fetchCart, updateCart, addToCart } from '../store/cart';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
// import { yellow } from "@material-ui/core/colors";
import Button from '@material-ui/core/Button';

// temporary axios import for testing
import axios from 'axios';

const navBarTheme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#224229',
    },
  },
});

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    //first check localstorage for an orderId
    const orderId = window.localStorage.getItem('orderId') || null;
    //if we have an orderId, fetch cart using orderId - pass in a userId if user logged in, or null if not
    const userId = this.props.auth.id || null;
    this.props.getCart(orderId, userId);
  }
  async componentDidUpdate(prevProps) {
    //if someone logs in and was previously not logged in
    if (!prevProps.auth.id && this.props.auth.id) {
      const guestPlants = this.props.cart.plants;
      //fetch cart with userId === auth.id and orderId = null,
      //this returns a cart with items from prev unfullfilled order if it exists, or if not, it returns an empty cart
      //this will set in localStorage a new orderId - the one associated with the loggedIn user
      await this.props.getCart(null, this.props.auth.id);
      const userPlants = this.props.cart.plants;
      guestPlants.forEach(async (plant) => {
        //see if there is a match of plants between carts
        const match = userPlants.find((_plant) => plant.id === _plant.id);
        if (match) {
          let total = plant.lineitem.amount + _plant.lineitem.amount; //total quantity of that plant between guest and user carts
          //if there is a match, update the lineitem for that user and orderId with the new plant quantity
          this.props.update(this.props.cart.id, plant.id, total);
        } else {
          //bc of the logic in the api, had to first add the plant to the cart, then update it
          await this.props.add(this.props.cart.id, plant.id);
          this.props.update(
            this.props.cart.id,
            plant.id,
            plant.lineitem.amount
          );
        }
      });
    }
  }
  render() {
    const { handleClick, isLoggedIn, isAdmin, cart } = this.props;
    let totalItems = 0;
    cart.plants.forEach((plant) => {
      totalItems += plant.lineitem.amount;
    });
    return (
      <div>
        <ThemeProvider theme={navBarTheme}>
          <AppBar
            position="static"
            color="primary"
            style={{
              height: '6rem',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <nav>
              <div id="navbar">
                <Link id="aLinks" id="home" to="/">
                  <h1 id="heading1">Kavakoro's Plants</h1>
                </Link>

                <div id="nav-links">
                  {isAdmin ? (
                    <Link id="aLinks" to="/admin">
                      Admin
                    </Link>
                  ) : (
                    ''
                  )}
                  <Link id="aLinks" id="aLinks" to="/">
                    Home
                  </Link>
                  {isLoggedIn ? (
                    <div>
                      <a href="/" onClick={handleClick}>
                        Logout
                      </a>
                      <Link to="/account">Account</Link>
                    </div>
                  ) : (
                    <div>
                      <Link to="/login">Login</Link>
                    </div>
                  )}
                  <Link to="/signup">Sign Up</Link>
                  <Link to="/about">About</Link>

                  <Link className="cart" to="/cart">
                    <div className="column cart">
                      <span className="total">
                        <img
                          id="cartImg"
                          height="40"
                          width="35"
                          src="/images/cart.png"
                        ></img>
                        <span className="total">{`(${totalItems})`}</span>
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </nav>
            <hr></hr>
          </AppBar>
        </ThemeProvider>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    cart: state.cart,
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    getCart: (orderId, userId) => dispatch(fetchCart(orderId, userId)),
    update: (orderId, plantId, amount) =>
      dispatch(updateCart(orderId, plantId, amount)),
    add: (orderId, plantId) => dispatch(addToCart(orderId, plantId)),
  };
};

export default connect(mapState, mapDispatch)(Navbar);
