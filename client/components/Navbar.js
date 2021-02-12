import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import AppBar from "@material-ui/core/AppBar";
import "../../public/Navbar.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";
// import { yellow } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";

const navBarTheme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: green[900],
    },
  },
});

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <ThemeProvider theme={navBarTheme}>
      <AppBar position="static" color="primary" style={{ height: "6rem" }}>
        {/* <nav>
        <div id="navbar">
          <div>
            <h1>KaVaKoRo's Plants</h1>
          </div>
          <div id="nav-links"></div>
          {isLoggedIn ? (
            <>
              <Link to="/home">Home</Link>
              <a href="/home" onClick={handleClick}>
                Logout
              </a>
            </>
          ) : (
            <div>
              Returning customer?
              <Link to="/login">Login</Link>
            </div>
          )}
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </nav> */}
        <nav>
          <div id="navbar">
            <div>
              <Link to="/home">
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
                  Returning customer?
                  <Link to="/login">Login</Link>
                </div>
              )}
              <Link to="/signup">Sign Up</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/admin">Admin</Link>
            </div>
          </div>
        </nav>
        <hr></hr>
      </AppBar>
    </ThemeProvider>
  </div>
);

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
  };
};

export default connect(mapState, mapDispatch)(Navbar);
