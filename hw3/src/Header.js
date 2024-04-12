import React from 'react';

const Header = ({ onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
  <span className="navbar-brand mb-0 h1 ms-3">Diabetes Monitoring System</span> {/* ms-3 for margin start (left) */}
  <button className="btn btn-danger me-3" onClick={onLogout}>Logout</button> {/* me-3 for margin end (right) */}
</nav>
  );
};

export default Header;
