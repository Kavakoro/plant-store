import React, { Component } from "react";
import { connect } from "react-redux";
import { setOrder } from "../store/singleOrder";
import { recomposeColor } from "@material-ui/core";

// import Button from '@material-ui/core/Button';

class UpdateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingAddress: "",
    };
    // console.log("constructor");
  }

  componentDidMount() {
    //   // console.log("componentDidmount");
    // this.props.setOrder(this.props.match.params.id);
    // console.log(otherProps);
    //   // console.log("id:", id);
    //   // this.setState({
    //   //   fullfilled: !this.props.order.fullfilled,
    //   // });
  }

  render() {
    const { order, shippingAddress } = this.props;
    console.log(shippingAddress);
    return (
      <div>
        {/* <form onClick={() => console.log("this is firing")}>
          <input placeholder="shipping Address"></input>
          <button>Save</button>
        </form> */}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    order: state.order,
  };
};
const mapToDispatch = (dispatch) => {
  // console.log("dispatch");
  return {
    setOrder: (id) => dispatch(setOrder(id)),
  };
};
export default connect((state) => state, mapToDispatch)(UpdateOrder);
