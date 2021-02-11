import React from 'react';
import { connect } from 'react-redux';
import '../../public/Home.css';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { email } = props;

  return (
    <div id="welcome">
      <h3>Welcome, {email}!</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.auth.email,
  };
};

export default connect(mapState)(Home);
