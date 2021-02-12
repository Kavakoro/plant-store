import axios from 'axios';
import React from 'react';
import '../../public/PlantAdmin.css';
import { Link } from 'react-router-dom';

export class UserAdmin extends React.Component {
  constructor() {
    super();
    this.state = { users: [] };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const users = (await axios.get('/api/users')).data;
    this.setState({ users });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
                <td>{user.emal}</td>
                <td>
                  <Link to={`/admin/Users/${user.id}`}>
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
