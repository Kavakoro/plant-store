import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
import '../../public/AuthForm.css';

const buttonTheme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: green[900],
    },
  },
});

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div id="authForm">
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <TextField label="Email" margin="normal" name="email" type="text" />
          {/* <label htmlFor="email">
            <small>Email</small>
          </label>{" "} */}
        </div>
        <div>
          <TextField label="Password" name="password" type="password" />
          {/* <label htmlFor="password">
            <small>Password</small>
          </label> */}
        </div>
        <div>
          <ThemeProvider theme={buttonTheme}>
            <Button type="submit" variant="contained" color="primary">
              {displayName}
            </Button>
          </ThemeProvider>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      {window.githubURL && (
        <a href={window.githubURL}>Login / Register Via Github </a>
      )}
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticate(email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
