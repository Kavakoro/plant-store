import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import AppBar from '@material-ui/core/AppBar';
import '../../public/Navbar.css';
import { fetchCart } from '../store/cart';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
// import { yellow } from "@material-ui/core/colors";
import Button from '@material-ui/core/Button';

//edit orderId when every time you reseed db
const orderId = '0492fecf-7ab8-4990-900c-62c97af4b84d';

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
    if (orderId) {
      this.props.getCart(orderId);
    } else {
      window.localStorage.setItem('orderId', orderId);
      this.props.getCart(orderId);
    }
  }
  render() {
    const { handleClick, isLoggedIn } = this.props;
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
                  <Link id="home" to="/home">
                    <h1>Kavakoro's Plants</h1>
                  </Link>
                </div>
                <div id="nav-links">
                  {/* <Link to="/home">Home</Link> */}
                  {isLoggedIn ? (
                    <a href="/home" onClick={handleClick}>
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
                  <Link to="/admin">Admin</Link>
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
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    getCart: (orderId) => dispatch(fetchCart(orderId)),
  };
};

export default connect(mapState, mapDispatch)(Navbar);
