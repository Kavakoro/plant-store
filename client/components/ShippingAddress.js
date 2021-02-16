import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../public/UpdateOrder.css';
// import { setOrder, updateOrder } from '../store/singleOrder';

import Button from '@material-ui/core/Button';

//not finished, just copied update order form for now.
//need to do routes and thunks

class ShippingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streetAddress: '',
      state: '',
      city: '',
      zipCode: '',
      error: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.setOrder(this.props.match.params.id);
    this.setState({
      streetAddress: this.props.order.streetAddress,
      state: this.props.order.state,
      city: this.props.order.city,
      zipCode: this.props.order.zipCode,
    });
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  //confused here on whether to do a updata or create??
  async onSubmit(ev) {
    ev.preventDefault();
    try {
      await this.props.create(
        this.state.streetAddress,
        this.state.state,
        this.state.city,
        this.state.zipCode
      );
    } catch (er) {
      this.setState({ error: er });
    }
  }

  render() {
    const { streetAddress, state, city, zipCode } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <form id="orderUpdate-form" onSubmit={onSubmit}>
        <p id="orderUpdate-p">
          <label id="oderForm-label">Street Address</label>
          <input
            id="orderForm-input"
            name="streetAddress"
            value={streetAddress || ''}
            onChange={onChange}
          />
        </p>
        <p id="orderUpdate-p">
          <label id="oderForm-label">State</label>
          <input
            id="orderForm-input"
            name="state"
            value={state || ''}
            onChange={onChange}
          />
        </p>
        <p id="orderUpdate-p">
          <label id="oderForm-label">City</label>
          <input
            id="orderForm-input"
            name="city"
            value={city || ''}
            onChange={onChange}
          />
        </p>
        <p id="orderUpdate-p">
          <label id="oderForm-label">Zip Code</label>
          <input
            id="orderForm-input"
            name="zipCode"
            value={zipCode || ''}
            onChange={onChange}
          />
        </p>

        <Button type="submit" id="orderUpdate-button">
          Save Changes
        </Button>
      </form>
    );
  }
}

// const mapState = (state) => {
//   const order = state.order;
//   return { order };
// };

const mapToDispatch = (dispatch, { history }) => {
  return {
    setOrder: (id) => {
      return dispatch(setOrder(id));
    },
    update: (id, streetAddress, state, city, zipCode) => {
      return dispatch(
        updateOrder(id, streetAddress, state, city, zipCode, history)
      );
    },
  };
};

export default connect((state) => state, mapToDispatch)(UpdateOrder);
