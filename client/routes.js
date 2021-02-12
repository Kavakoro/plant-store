import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import {
  Login,
  Signup,
  Home,
  AllPlants,
  SinglePlant,
  Cart,
  Checkout,
  UpdatePlant,
  PlantAdmin,
  AdminPanel,
} from './components';
import { me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          // all this does is say, "hello!, email!"
          <Route exact path="/home" component={Home} />
        ) : (
          ''
        )}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/home" component={AllPlants} />
        <Route exact path="/plants/:plantId" component={SinglePlant} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/cart/checkout" component={Checkout} />
        <Route exact path="/plants/:plantId/update" component={UpdatePlant} />
        <Route path="/admin" component={AdminPanel} />
        <Route path="/admin/Plants" component={PlantAdmin} />
      </div>
    );
  }
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
