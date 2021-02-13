import React from 'react';
import { connect } from 'react-redux';
import '../../public/Home.css';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { email, isLoggedIn } = props;

  return (
    <div id="welcome">
      {isLoggedIn ? <h3>Welcome, {email}!</h3> : <h3>Welcome!</h3>}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    email: state.auth.email,
  };
};

export default connect(mapState)(Home);
