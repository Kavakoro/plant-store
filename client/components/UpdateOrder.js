import React, { Component } from "react";
import { connect } from "react-redux";
import "../../public/UpdateOrder.css";
import { setOrder, updateOrder } from "../store/singleOrder";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import Button from "@material-ui/core/Button";

class UpdateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipTo: this.props.order.id ? this.props.order.shipTo : "",
      streetAddress: this.props.order.id ? this.props.order.streetAddress : "",
      state: this.props.order.id ? this.props.order.state : "",
      city: this.props.order.id ? this.props.order.city : "",
      zipCode: this.props.order.id ? this.props.order.zipCode : "",
      fullfilled: this.props.order.id ? this.props.order.fullfilled : "",
      total: this.props.order.id ? this.props.order.total : "",
      error: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.setOrder(this.props.match.params.id);
    this.setState({
      shipTo: this.props.order.shipTo,
      streetAddress: this.props.order.streetAddress,
      state: this.props.order.state,
      city: this.props.order.city,
      zipCode: this.props.order.zipCode,
      fullfilled: this.props.order.fullfilled,
      total: this.props.order.total,
    });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.order.id && this.props.order.id) {
      this.setState({
        shipTo: this.props.order.shipTo,
        streetAddress: this.props.order.streetAddress,
        state: this.props.order.state,
        city: this.props.order.city,
        zipCode: this.props.order.zipCode,
        fullfilled: this.props.order.fullfilled,
        total: this.props.order.total,
      });
    }
  }

  async onSubmit(ev) {
    ev.preventDefault();
    try {
      await this.props.update(
        this.props.order.id,
        this.state.shipTo,
        this.state.streetAddress,
        this.state.state,
        this.state.city,
        this.state.zipCode,
        this.state.fullfilled,
        this.state.total
      );
    } catch (er) {
      console.log("this is er", er);
      this.setState({ error: er });
    }
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render() {
    const {
      shipTo,
      streetAddress,
      state,
      city,
      zipCode,
      fullfilled,
      total,
    } = this.state;

    const { onChange, onSubmit } = this;

    return (
      <form id="orderUpdate-form" onSubmit={onSubmit}>
        <h1 id="update-heading">Update Order Details</h1>

        <InputLabel id="ship-to"> ship-to</InputLabel>
        <TextField
          name="shipTo"
          value={shipTo}
          onChange={onChange}
          variant="outlined"
        ></TextField>

        <InputLabel id="street-address">Street Address</InputLabel>
        <TextField
          name="streetAddress"
          value={streetAddress}
          onChange={onChange}
          variant="outlined"
        ></TextField>

        <InputLabel id="state">State</InputLabel>
        <TextField
          name="state"
          value={state}
          onChange={onChange}
          variant="outlined"
        ></TextField>

        <InputLabel id="city">City</InputLabel>
        <TextField
          name="city"
          value={city}
          onChange={onChange}
          variant="outlined"
        ></TextField>

        <InputLabel id="zip-code">Zip Code</InputLabel>
        <TextField
          name="zipCode"
          value={zipCode}
          onChange={onChange}
          variant="outlined"
        ></TextField>

        <InputLabel id="fullfilled"> Fullfilled (yes/no) ?</InputLabel>
        <Select
          labelId="label"
          name="fullfilled"
          value={fullfilled}
          onChange={onChange}
        >
          <MenuItem value={false}>No</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
        </Select>

        <InputLabel id="order-total">Order Total</InputLabel>
        <TextField
          name="total"
          value={total}
          onChange={onChange}
          variant="outlined"
        ></TextField>

        <Button type="submit" id="orderUpdate-button" variant="contained">
          Save Changes
        </Button>
      </form>
    );
  }
}

const mapState = (state) => {
  const order = state.order;
  return { order };
};

const mapToDispatch = (dispatch, { history }) => {
  return {
    setOrder: (id) => {
      return dispatch(setOrder(id));
    },
    update: (
      id,
      shipTo,
      streetAddress,
      state,
      city,
      zipCode,
      fullfilled,
      total
    ) => {
      return dispatch(
        updateOrder(
          id,
          shipTo,
          streetAddress,
          state,
          city,
          zipCode,
          fullfilled,
          total,
          history
        )
      );
    },
  };
};

export default connect((state) => state, mapToDispatch)(UpdateOrder);
