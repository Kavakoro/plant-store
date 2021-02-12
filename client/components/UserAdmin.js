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
    const { users } = this.state;
    if (!users.length) return null;
    return (
      <div id="admin-db">
        <h1>User Database</h1>
        <table className="users">
          <thead>
            <tr>
              <th>ID</th>
              <th className="email">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>{user.id}</td>
                <td>{user.email}</td>
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
