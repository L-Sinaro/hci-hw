// Inside LoginPage.js
import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [firstName, setFirstName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(firstName);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}> {/* Adjusted for centering */}
      <form onSubmit={handleSubmit} className="form-inline">
        <input
          type="text"
          className="form-control mb-2 mr-sm-2"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter your first name"
          required
        />
        <button type="submit" className="btn btn-primary mb-2">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
