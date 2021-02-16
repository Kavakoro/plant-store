import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../public/UpdateOrder.css';
import { setOrder, updateOrder } from '../store/singleOrder';

import Button from '@material-ui/core/Button';

class UpdateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        this.state.streetAddress,
        this.state.state,
        this.state.city,
        this.state.zipCode,
        this.state.fullfilled,
        this.state.total
      );
    } catch (er) {
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
        <p id="orderUpdate-p">
          <label id="oderForm-label">Fullfilled</label>
          <input
            id="orderForm-input"
            name="fullfilled"
            value={fullfilled}
            onChange={onChange}
          />
        </p>
        <p id="orderUpdate-p">
          <label id="oderForm-label">Order Total</label>
          <input
            id="orderForm-input"
            name="total"
            value={total || ''}
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
    update: (id, streetAddress, state, city, zipCode, fullfilled, total) => {
      return dispatch(
        updateOrder(
          id,
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
