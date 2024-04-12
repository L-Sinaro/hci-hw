import React, { useState } from 'react';
import "./LoginPage.css"

const LoginPage = ({ onLogin, usersData }) => {
  const [firstName, setFirstName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the first name exists in the usersData
    const userExists = usersData.some(user => user.name.split(' ')[0].toLowerCase() === firstName.toLowerCase());

    if (userExists) {
      onLogin(firstName);
      setErrorMessage(''); // Clear any previous error message
    } else {
      setErrorMessage('First name not in the database, please try again.');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <h2>Select Your Name</h2>
      <div>
        {usersData.map((user, index) => (
          <button
            key={index}
            className="btn btn-outline-primary m-2"
            onClick={() => onLogin(user.name)}
          >
            {user.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LoginPage;
