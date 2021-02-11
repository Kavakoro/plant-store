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
  UpdatePlant,
} from './components';
// import AllPlants from './components/AllPlants';
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
        <div>
          {isLoggedIn ? (
            <Switch>
              <Route path="/home" component={Home} />
              <Redirect to="/home" />
            </Switch>
          ) : (
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              {/* <Redirect to="/login" /> */}
            </Switch>
          )}
        </div>
        <Route exact path="/" component={AllPlants} />
        <Route exact path="/login" component={AllPlants} />
        <Route exact path="/plants/:plantId" component={SinglePlant} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/plants/:plantId/update" component={UpdatePlant} />
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
