import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../public/Account.css';
import Button from '@material-ui/core/Button';

export const Account = (props) => {
  return (
    <div id="account">
      <h1>Your Account</h1>
      <div id="account-info">
        <Button
          component={Link}
          to="/account/updateprofile"
          variant="contained"
          type="submit"
          style={
            ({ height: '3rem' },
            { margin: '1rem' },
            { backgroundColor: 'rgb(208, 236, 208)' })
          }
        >
          Update Profile
        </Button>
      </div>
      <Button
        component={Link}
        to="/account/orders"
        type="submit"
        variant="contained"
        style={
          ({ height: '3rem' },
          { margin: '1rem' },
          { backgroundColor: 'rgb(208, 236, 208)' })
        }
      >
        View Past Orders
      </Button>
    </div>
  );
};
