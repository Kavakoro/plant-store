import React from 'react';
import '../../public/AdminPanel.css';
import { Link } from 'react-router-dom';

export class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const models = [{ name: 'Users' }, { name: 'Plants' }, { name: 'Orders' }];
    return (
      <div id="admin-panel">
        <h1>Admin Dashboard</h1>
        <div>
          {models.map((model, idx) => (
            <Link key={idx} to={`/admin/${model.name}`}>
              <button>{model.name}</button>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
