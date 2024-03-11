import React, { useState } from 'react';
import Header from './Header'; // Import the Header component
import LoginPage from './LoginPage';
import UserInfo from './UserInfo';
import usersData from './patient_data.json'; // Make sure this path matches your file location
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (firstName) => {
    const user = usersData.find((user) => user.name.split(' ')[0].toLowerCase() === firstName.toLowerCase());
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="App">
      <Header onLogout={handleLogout} />
      <div className="container mt-5">
        {!currentUser ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          <UserInfo user={currentUser} />
        )}
      </div>
    </div>
  );
}

export default App;
