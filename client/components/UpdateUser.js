import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUser, setUser } from "../store/singleUser";
import "../../public/UpdateUser.css";
import Button from "@material-ui/core/Button";

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // username: this.props.user.id ? this.props.user.username : '',
      email: this.props.user.id ? this.props.user.email : "",
      error: "",
    };
    //console.log('props', this.props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // not sure if i should be mounting the state or if this is correct?
  componentDidMount() {
    //console.log('props', this.props);
    this.props.setUser(this.props.match.params.id);
    this.setState({
      //username: this.props.user.username,
      email: this.props.user.email,
    });
    const id = this.props.match.params.id;
    //console.log('id:', typeof id);
  }

  componentDidUpdate(prevProps) {
    //console.log('component updating is running');

    if (!prevProps.user.id && this.props.user.id) {
      //console.log('if statement running');
      this.setState({
        // username: this.props.user.username,
        email: this.props.user.email,
      });
      //console.log(this.state.name);
    }

    //console.log(this.props);
    //console.log('this is props', this.props);
  }

  async onSubmit(ev) {
    ev.preventDefault();
    try {
      //console.log('onSubmit');
      //the id is this.props.user.id and updating with the new state name
      await this.props.update(
        this.props.user.id,
        //this.state.username,
        this.state.email
      );
    } catch (er) {
      //console.log('this is er', er);
      //this.setState({ error: er.response.data.error });
      this.setState({ error: er });
    }
    //console.log('state', this.state);
  }
  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render() {
    const { username, email } = this.state;

    const { onChange, onSubmit } = this;

    console.log(email);

    return (
      <form id="userUpdate-form" onSubmit={onSubmit}>
        {/* <p id="userUpdate-p">
          <label id="userform-label">Username:</label>
          <input
            id="userform-input"
            name="username"
            value={username}
            onChange={onChange}
          />
        </p> */}
        <p id="userUpdate-p">
          <label id="userform-label">Email</label>
          <input
            id="userform-input"
            name="email"
            value={email}
            onChange={onChange}
          />
        </p>
        <Button type="submit" id="userUpdate-button">
          Save Changes
        </Button>
      </form>
    );
  }
}

const mapToState = (state, otherProps) => {
  //console.log('maptostate:', state);
  const user = state.user;
  return { user };
};

const mapToDispatch = (dispatch, { history }) => {
  //console.log('this is history', history);

  return {
    setUser: (id) => {
      return dispatch(setUser(id));
    },
    update: (id, email) => {
      return dispatch(updateUser(id, email, history));
    },
  };
};

export default connect(mapToState, mapToDispatch)(UpdateUser);
