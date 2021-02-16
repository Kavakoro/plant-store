import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, setUser } from '../store/singleUser';
import '../../public/UpdateUser.css';
import Button from '@material-ui/core/Button';

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.user.id ? this.props.user.firstName : '',
      lastName: this.props.user.id ? this.props.user.lastName : '',
      phoneNumber: this.props.user.id ? this.props.user.phoneNumber : '',
      birthdate: this.props.user.id ? this.props.user.birthdate : '',
      email: this.props.user.id ? this.props.user.email : '',
      isAdmin: this.props.user.id ? this.props.user.isAdmin : false,
      error: '',
    };
    //console.log('props', this.props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    //console.log('props', this.props);
    await this.props.setUser(this.props.match.params.id);
    this.setState({
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      phoneNumber: this.props.user.phoneNumber,
      birthdate: this.props.user.birthdate,
      email: this.props.user.email,
      isAdmin: this.props.user.isAdmin,
    });
    //const id = this.props.match.params.id;
    //console.log('id:', typeof id);
  }

  componentDidUpdate(prevProps) {
    console.log('component updating is running');

    if (!prevProps.user.id && this.props.user.id) {
      console.log('if statement running');
      this.setState({
        // username: this.props.user.username,
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        phoneNumber: this.props.user.phoneNumber,
        birthdate: this.props.user.birthdate,
        email: this.props.user.email,
        isAdmin: this.props.user.isAdmin,
      });
      //console.log(this.state.name);
    }

    console.log('this is props', this.props);
  }

  async onSubmit(ev) {
    ev.preventDefault();
    try {
      console.log('onSubmit');
      //the id is this.props.user.id and updating with the new state name
      await this.props.update(
        this.props.user.id,
        this.state.firstName,
        this.state.lastName,
        this.state.phoneNumber,
        this.state.birthdate,
        this.state.email,
        this.state.isAdmin
      );
    } catch (er) {
      console.log('this is er', er);
      console.log(er.response.data, 'er.response.data');
      this.setState({ error: er });
    }
    //console.log('state', this.state);
  }
  onChange(ev) {
    //this.setState({ [ev.target.name]: ev.target.value });
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render() {
    const {
      firstName,
      lastName,
      phoneNumber,
      birthdate,
      email,
      isAdmin,
    } = this.state;

    const { onChange, onSubmit } = this;

    const yes = true;
    const no = false;
    //console.log(this.props);

    return (
      <form id="userUpdate-form" onSubmit={onSubmit}>
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
        <p id="userUpdate-p">
          <label id="userform-label">Email</label>
          <input
            id="userform-input"
            name="email"
            value={email}
            onChange={onChange}
          />
        </p>
        <p id="userUpdate-p">
          <label id="userform-label">Make Admin?</label>
          <select
            id="userform-input"
            name="isAdmin"
            value={isAdmin}
            onChange={onChange}
          >
            <option value={false}>--choose an option--</option>
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </p>
        <Button type="submit" id="userUpdate-button" variant="contained">
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
    update: (
      id,
      firstName,
      lastName,
      phoneNumber,
      birthdate,
      email,
      isAdmin
    ) => {
      return dispatch(
        updateUser(
          id,
          firstName,
          lastName,
          phoneNumber,
          birthdate,
          email,
          isAdmin,
          history
        )
      );
    },
  };
};
//mapToState
export default connect((state) => state, mapToDispatch)(UpdateUser);
