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

//edit orderId when every time you reseed db
// const orderId = '0492fecf-7ab8-4990-900c-62c97af4b84d';

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
    //const orderId = window.localStorage.getItem('orderId');
    // testing orderId placeholder
    // const orderId = (await axios.get('/api/test/cartid')).data;
    // console.log(orderId, 'orderId');

    //first check localstorage for an orderId
    const orderId = window.localStorage.getItem('orderId') || null;
    console.log(orderId, 'orderId');
    //if we have an orderId, fetch cart using orderId and pass in a userId if in state, or null if not
    const userId = this.props.auth.id || null;
    console.log(userId, 'userId before fetching cart');

    this.props.getCart(orderId, userId);
  }
  async componentDidUpdate(prevProps) {
    console.log(prevProps.auth.id, 'prevProps.auth.id');
    console.log(this.props.auth.id, 'this.props.auth.id');

    //if someone logged in from previously being not logged in
    if (!prevProps.auth.id && this.props.auth.id) {
      const guestPlants = this.props.cart.plants;
      console.log(guestPlants, 'guest plants');
      //fetch cart with userId === auth.id and orderId = null,
      //this will return a cart with items from prev order or empty cart
      //this will set in localStorage a new orderId - the one associated with the loggedIn user
      await this.props.getCart(null, this.props.auth.id);
      const userPlants = this.props.cart.plants;
      guestPlants.forEach((plant) => {
        //see if there is a match of plants between carts
        const match = userPlants.find((_plant) => plant.id === _plant.id);
        if (match) {
          let total = plant.lineitem.amount + _plant.lineitem.amount; //total quantity of that plant between guest and user cart
          //if there is a match, update the lineitem for that user and orderId with the new plant quantity
          this.props.update(this.props.cart.id, plant.id, total);
        } else {
          //the plant from guest cart is not in the userCart --  add it to the userCart
          this.props.add(this.props.cart.id, plant.id);
        }
      });
    }
  }
  render() {
    const orderId = localStorage.getItem('orderId');
    console.log(orderId, 'order Id before navbar rendered');
    const { handleClick, isLoggedIn, isAdmin } = this.props;
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
                <div>
                  <Link id="home" to="/">
                    <h1>Kavakoro's Plants</h1>
                  </Link>
                </div>
                <div id="nav-links">
                  {isAdmin ? <Link to="/admin">Admin</Link> : ''}
                  <Link to="/">Home</Link>
                  {isLoggedIn ? (
                    <a href="/" onClick={handleClick}>
                      Logout
                    </a>
                  ) : (
                    <div>
                      <span>Returning customer?</span>
                      <Link to="/login">Login</Link>
                    </div>
                  )}
                  <Link to="/signup">Sign Up</Link>
                  <Link to="/cart">
                    <img height="40" width="35" src="/images/cart.png"></img>
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
