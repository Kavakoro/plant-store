import React, { Component } from "react";
import { connect } from "react-redux";
import "../../public/UpdateOrder.css";
import { setOrder, updateOrder } from "../store/singleOrder";

import Button from "@material-ui/core/Button";

class UpdateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingAddress: this.props.order.id
        ? this.props.order.shippingAddress
        : "",
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
      shippingAddress: this.props.order.shippingAddress,
      fullfilled: this.props.order.fullfilled,
      total: this.props.order.total,
    });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.order.id && this.props.order.id) {
      this.setState({
        shippingAddress: this.props.order.shippingAddress,
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
        this.state.shippingAddress,
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
    const { shippingAddress, fullfilled, total } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <form id="orderUpdate-form" onSubmit={onSubmit}>
        <p id="orderUpdate-p">
          <label id="oderForm-label">Shipping Address</label>
          <input
            id="orderForm-input"
            name="shippingAddress"
            value={shippingAddress || ""}
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
            value={total || ""}
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
    update: (id, shippingAddress, fullfilled, total) => {
      return dispatch(
        updateOrder(id, shippingAddress, fullfilled, total, history)
      );
    },
  };
};

export default connect((state) => state, mapToDispatch)(UpdateOrder);
