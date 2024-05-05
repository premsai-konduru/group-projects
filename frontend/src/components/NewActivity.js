import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function NewActivity() {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSetDeadline = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/activities', {
        title,
        deadline,
      });

      console.log(deadline);
      console.log('Deadline set:', response.data);
    } catch (error) {
      console.error('Error setting deadline:', error.message);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Activity Dairy
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/new">
                  New
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* New Activity Form */}
      <div className="container mt-3">
        <h2>New Activity</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="ActionTitle" className="form-label">
              Set Title:
            </label>
            <input
              type="text"
              className="form-control"
              id="ActionTitle"
              name="ActionTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="deadline" className="form-label">
              Set Deadline:
            </label>
            <input
              type="date"
              className="form-control"
              id="deadline"
              name="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={handleSetDeadline}>
            Set Deadline
          </button>
        </form>
        <br />
        <Link to="/activities" className="btn btn-secondary">
          Back to Activities
        </Link>
      </div>
    </div>
  );
}

export default NewActivity;
