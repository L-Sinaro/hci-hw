import React from 'react';

const Header = ({ onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
      <span className="navbar-brand mb-0 h1">Diabetes Monitoring System</span>
      <button className="btn btn-danger" onClick={onLogout}>Logout</button>
    </nav>
  );
};

export default Header;
