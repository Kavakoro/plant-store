import axios from 'axios';
import React from 'react';
import '../../public/PlantAdmin.css';
import { Link } from 'react-router-dom';

export class UserAdmin extends React.Component {
  constructor() {
    super();
    this.state = { users: [] };
  }

  async componentDidMount() {
    const users = (await axios.get('/api/users')).data;
    this.setState({ users });
  }

  render() {
    //console.log('state', this.state);
    const { users } = this.state;
    console.log(users, ' users');
    if (!users.length) return null;
    return (
      <div id="admin-db">
        <h1>User Database</h1>
        <table className="users">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>D.O.B.</th>
              <th>Email</th>
              <th>Admin?</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.birthdate}</td>
                <td className="email">{user.email}</td>
                <td>{user.isAdmin ? 'yes' : 'no'}</td>
                <td>
                  <Link to={`/admin/Users/update/${user.id}`}>
                    <button>Edit</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
