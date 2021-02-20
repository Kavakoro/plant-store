import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
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
	PastOrders,
	Account,
	SinglePastOrder,
	About,
	ShippingInfo,
	ReturnPolicy,
} from "./components";
import { me } from "./store";

/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData();
	}
	componentDidUpdate(prevProps) {}
	render() {
		return (
			<div>
				<Route exact path="/about" component={About} />
				<Route exact path="/" component={Home} />
				<Route exact path="/" component={AllPlants} />
				<Route exact path="/shipping-info" component={ShippingInfo} />
				<Route exact path="/return-policy" component={ReturnPolicy} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route exact path="/plants/:plantId" component={SinglePlant} />
				<Route exact path="/cart" component={Cart} />
				<Route path="/admin" component={AdminPanel} />
				<Route exact path="/admin/Plants" component={PlantAdmin} />
				<Route exact path="/admin/Users" component={UserAdmin} />
				<Route exact path="/admin/Orders" component={OrderAdmin} />
				<Route exact path="/account" component={Account} />
				<Route exact path="/account/orders" component={PastOrders} />
				<Route exact path="/account/updateprofile" component={UpdateProfile} />
				<Route
					exact
					path="/account/orders/:orderId"
					component={SinglePastOrder}
				/>
				<Switch>
					<Route path="/admin/Plants/createplant" component={CreatePlant} />
					<Route path="/admin/Users/update/:id" component={UpdateUser} />
					<Route path="/admin/Orders/update/:id" component={UpdateOrder} />
					<Route path="/admin/Plants/update/:plantId" component={UpdatePlant} />
				</Switch>
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
			dispatch(me(null));
		},
	};
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
