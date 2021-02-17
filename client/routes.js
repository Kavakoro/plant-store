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
  UpdateUser,
  UpdateOrder,
  UpdateProfile,
  PlantAdmin,
  AdminPanel,
  UserAdmin,
  OrderAdmin,
  CreatePlant,
} from './components';
import { me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  componentDidUpdate(prevProps) {
    console.log('route component updated');
  }
  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/" component={AllPlants} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/plants/:plantId" component={SinglePlant} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/cart/checkout" component={Checkout} />
        <Route path="/admin" component={AdminPanel} />
        <Route path="/admin/Plants" component={PlantAdmin} />
        <Route path="/admin/Users" component={UserAdmin} />
        <Route path="/admin/Orders" component={OrderAdmin} />
        <Route exact path="/admin/Plants/createplant" component={CreatePlant} />
        <Route exact path="/admin/Users/update/:id" component={UpdateUser} />
        <Route exact path="/updateprofile" component={UpdateProfile} />
        <Route
          exact
          path="/admin/Orders/update/:id"
          component={UpdateOrder}
        />{' '}
        <Route
          exact
          path="/admin/Plants/update/:plantId"
          component={UpdatePlant}
        />
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
