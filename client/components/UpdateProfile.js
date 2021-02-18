import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser, updateProfile } from '../store/singleUser';
import '../../public/updateProfile.css';
import '../../public/UpdatePlant.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
        <h1 id="update-heading">Update User Details</h1>
        <p id="userUpdate-p">
          <TextField
            id="standard-basic"
            name="firstName"
            value={firstName}
            onChange={onChange}
            label="First Name"
            variant="outlined"
          ></TextField>
        </p>
        <p id="userUpdate-p">
          <TextField
            value={lastName}
            onChange={onChange}
            id="standard-basic"
            label="Last Name"
            name="lastName"
            variant="outlined"
          ></TextField>
        </p>
        <p id="userUpdate-p">
          <TextField
            id="standard-basic"
            name="phoneNumber"
            value={phoneNumber}
            label="Phone Number"
            onChange={onChange}
            variant="outlined"
          ></TextField>
        </p>
        <p id="userUpdate-p">
          <TextField
            name="birthdate"
            value={birthdate}
            onChange={onChange}
            label="Date of Birth"
            id="standard-basic"
            variant="outlined"
          ></TextField>
        </p>
        <p id="accountUpdate-p">
          <TextField
            name="email"
            value={email}
            label="Email"
            onChange={onChange}
            id="standard-basic"
            variant="outlined"
          ></TextField>
        </p>
        <div className="submit">
          <Button
            variant="contained"
            type="submit"
            style={
              ({ height: '2em' },
              { margin: '3rem' },
              { backgroundColor: '#abd4a8' })
            }
          >
            Save Changes
          </Button>
        </div>
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
