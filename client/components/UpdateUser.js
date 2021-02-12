import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, setUser } from '../store/singleUser';
import axios from 'axios';
import '../../public/UpdateUser.css';

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user.id ? this.props.user.username : '',
      email: this.props.user.id ? this.props.user.email : '',
      error: '',
    };
    //check if you have props
    //console.log(this.props.plant);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // not sure if i should be mounting the state or if this is correct?
  async componentDidMount() {
    await this.props.setUser(this.props.match.params.id * 1);
    this.setState({
      username: this.props.user.username,
      email: this.props.user.email,
    });
    console.log('id', this.props.match.params.id * 1);
  }

  componentDidUpdate(prevProps) {
    console.log('is this running');

    if (!prevProps.user.id && this.props.user.id) {
      console.log('if statement');
      this.setState({
        username: this.props.user.username,
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
      console.log('onSubmit');
      //the id is this.props.user.id and updating with the new state name
      await this.props.update(
        this.props.user.id,
        this.state.username,
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

    //console.log(this.props);

    return (
      <form id="userUpdate-form" onSubmit={onSubmit}>
        <p id="userUpdate-p">
          <label id="userform-label">Username</label>
          <input
            id="userform-input"
            name="username"
            value={username}
            onChange={onChange}
          />
        </p>
        <p id="userUpdate-p">
          <label id="userform-label">Email</label>
          <input
            id="userform-input"
            name="email"
            value={email}
            onChange={onChange}
          />
        </p>
        <button id="userUpdate-button">Save Changes</button>
      </form>
    );
  }
}

const mapToState = (state, otherProps) => {
  console.log('state:', state);
  const user = state.user;
  return { user };
};

const mapToDispatch = (dispatch, { history }) => {
  console.log('this is history', history);

  return {
    setUser: (id) => {
      return dispatch(setUser(id));
    },
    update: (id, username, email) => {
      return dispatch(updateUser(id, username, email, history));
    },
  };
};

export default connect(mapToState, mapToDispatch)(UpdateUser);
