import React from 'react';
import '../../public/AdminPanel.css';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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
            <Button
              key={idx}
              variant="contained"
              type="submit"
              style={({ height: '3rem' }, { margin: '1rem' })}
              href={`/admin/${model.name}`}
            >
              {model.name}
            </Button>
          ))}
        </div>
      </div>
    );
  }
}
