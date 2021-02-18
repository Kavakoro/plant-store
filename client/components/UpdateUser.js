import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, setUser } from '../store/singleUser';
import '../../public/UpdateUser.css';
import '../../public/UpdatePlant.css';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

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
    if (!prevProps.user.id && this.props.user.id) {
      this.setState({
        // username: this.props.user.username,
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        phoneNumber: this.props.user.phoneNumber,
        birthdate: this.props.user.birthdate,
        email: this.props.user.email,
        isAdmin: this.props.user.isAdmin,
      });
    }
  }

  async onSubmit(ev) {
    ev.preventDefault();
    try {
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
      // console.log(er.response.data, "er.response.data");
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
      firstName,
      lastName,
      phoneNumber,
      birthdate,
      email,
      isAdmin,
    } = this.state;

    const { onChange, onSubmit } = this;

    return (
      <div id="update">
        <h1 id="update-heading">Update User Details</h1>

        <form id="update-form" onSubmit={onSubmit}>
          <InputLabel id="first-name">First Name</InputLabel>
          <TextField
            name="firstName"
            value={firstName}
            id="first-name"
            onChange={onChange}
            variant="outlined"
          ></TextField>

          <InputLabel id="last-name">Last Name</InputLabel>
          <TextField
            name="lastName"
            value={lastName}
            id="last-name"
            onChange={onChange}
            variant="outlined"
          ></TextField>

          <InputLabel id="phone-number">Phone Number</InputLabel>
          <TextField
            name="phoneNumber"
            value={phoneNumber}
            id="phone-number"
            onChange={onChange}
            variant="outlined"
          ></TextField>

          <InputLabel id="dob">Date of Birth</InputLabel>
          <TextField
            name="birthday"
            value={birthdate}
            onChange={onChange}
            id="dob"
            variant="outlined"
          ></TextField>

          <InputLabel id="email">Email</InputLabel>
          <TextField
            name="email"
            value={email}
            onChange={onChange}
            id="email"
            variant="outlined"
          ></TextField>

          <InputLabel>Role</InputLabel>
          <div className=" admin row">
            <Select
              style={{ margin: 'auto' }}
              value={isAdmin}
              name="isAdmin"
              id="admin"
              onChange={onChange}
            >
              <MenuItem value={false}>user </MenuItem>

              <MenuItem value={true}> admin </MenuItem>
            </Select>
          </div>
          <Button
            disabled={isAdmin === ''}
            type="submit"
            id="userUpdate-button"
            variant="contained"
            style={
              ({ height: '2em' },
              { width: '10rem' },
              { margin: '3rem' },
              { backgroundColor: '#abd4a8' })
            }
          >
            Save Changes
          </Button>
        </form>
      </div>
    );
  }
}

const mapToState = (state, otherProps) => {
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
