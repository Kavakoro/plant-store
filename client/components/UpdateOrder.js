import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../public/UpdateOrder.css';
import { setOrder, updateOrder } from '../store/singleOrder';

import Button from '@material-ui/core/Button';

class UpdateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipTo: this.props.order.id ? this.props.order.shipTo : '',
      streetAddress: this.props.order.id ? this.props.order.streetAddress : '',
      state: this.props.order.id ? this.props.order.state : '',
      city: this.props.order.id ? this.props.order.city : '',
      zipCode: this.props.order.id ? this.props.order.zipCode : '',
      fullfilled: this.props.order.id ? this.props.order.fullfilled : '',
      total: this.props.order.id ? this.props.order.total : '',
      error: '',
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
      console.log('this is er', er);
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
        <p id="orderUpdate-p">
          <label id="orderForm-label">Ship To</label>
          <input
            id="orderForm-input"
            name="shipTo"
            value={shipTo}
            onChange={onChange}
          />
        </p>

        <p id="orderUpdate-p">
          <label id="orderForm-label">Street Address</label>
          <input
            id="orderForm-input"
            name="streetAddress"
            value={streetAddress}
            onChange={onChange}
          />
        </p>
        <p id="orderUpdate-p">
          <label id="orderForm-label">State</label>
          <input
            id="orderForm-input"
            name="state"
            value={state}
            onChange={onChange}
          />
        </p>
        <p id="orderUpdate-p">
          <label id="orderForm-label">City</label>
          <input
            id="orderForm-input"
            name="city"
            value={city}
            onChange={onChange}
          />
        </p>
        <p id="orderUpdate-p">
          <label id="orderForm-label">Zip Code</label>
          <input
            id="orderForm-input"
            name="zipCode"
            value={zipCode}
            onChange={onChange}
          />
        </p>
        <p id="orderUpdate-p">
          <label id="orderForm-label">Fullfilled (yes/no) ?</label>
          <select
            id="orderForm-input"
            name="fullfilled"
            value={fullfilled}
            onChange={onChange}
          >
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </p>
        <p id="orderUpdate-p">
          <label id="orderForm-label">Order Total</label>
          <input
            placeholder="must be a valid integer"
            id="orderForm-input"
            name="total"
            value={total}
            onChange={onChange}
          />
        </p>

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
