import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser, updateProfile } from '../store/singleUser';
import '../../public/updateProfile.css';
import Button from '@material-ui/core/Button';

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.user.id ? this.props.user.firstName : '',
      lastName: this.props.user.id ? this.props.user.lastName : '',
      phoneNumber: this.props.user.id ? this.props.user.phoneNumber : '',
      birthdate: this.props.user.id ? this.props.user.birthdate : '',
      email: this.props.user.id ? this.props.user.email : '',
      error: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.setUser(this.props.auth.id);
    this.setState({
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      phoneNumber: this.props.user.phoneNumber,
      birthdate: this.props.user.birthdate,
      email: this.props.user.email,
    });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.auth.id && this.props.auth.id) {
      this.setState({
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        phoneNumber: this.props.user.phoneNumber,
        birthdate: this.props.user.birthdate,
        email: this.props.user.email,
      });
    }
  }

  async onSubmit(ev) {
    ev.preventDefault();
    try {
      await this.props.update(
        this.props.auth.id,
        this.state.firstName,
        this.state.lastName,
        this.state.phoneNumber,
        this.state.birthdate,
        this.state.email
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
    console.log(this.state.birthdate, 'this.state.birthdate');
    const { firstName, lastName, phoneNumber, birthdate, email } = this.state;

    const { onChange, onSubmit } = this;

    return (
      <form id="accountUpdate-form" onSubmit={onSubmit}>
        <p id="userUpdate-p">
          <label id="userform-label">First Name</label>
          <input
            id="userform-input"
            name="firstName"
            value={firstName}
            onChange={onChange}
          />
        </p>
        <p id="userUpdate-p">
          <label id="userform-label">Last Name</label>
          <input
            id="userform-input"
            name="lastName"
            value={lastName}
            onChange={onChange}
          />
        </p>
        <p id="userUpdate-p">
          <label id="userform-label">Phone Number</label>
          <input
            id="userform-input"
            name="phoneNumber"
            value={phoneNumber}
            onChange={onChange}
          />
        </p>
        <p id="userUpdate-p">
          <label id="userform-label">Date of Birth</label>
          <input
            id="userform-input"
            name="birthdate"
            value={birthdate}
            onChange={onChange}
          />
        </p>
        <p id="accountUpdate-p">
          <label id="accountform-label">Email</label>
          <input
            id="accountform-input"
            name="email"
            value={email}
            onChange={onChange}
          />
        </p>
        <Button type="submit" id="accountUpdate-button">
          Save Changes
        </Button>
      </form>
    );
  }
}

const maptToState = (state) => {
  const { auth, user } = state;

  return { auth, user };
};

const mapToDispatch = (dispatch, { history }) => {
  return {
    setUser: (id) => {
      return dispatch(setUser(id));
    },
    update: (id, firstName, lastName, phoneNumber, birthdate, email) => {
      return dispatch(
        updateProfile(
          id,
          firstName,
          lastName,
          phoneNumber,
          birthdate,
          email,
          history
        )
      );
    },
  };
};

export default connect(maptToState, mapToDispatch)(UpdateProfile);
