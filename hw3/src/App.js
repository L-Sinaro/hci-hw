import React, { useState } from 'react';
import Header from './Header'; // Make sure the path is correct
import LoginPage from './LoginPage';
import UserInfo from './UserInfo';
import usersData from './patient_data.json';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showExplanationInput, setShowExplanationInput] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [explanationSubmitted, setExplanationSubmitted] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleLogin = (fullName) => {
    const user = usersData.find(user => user.name === fullName);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    // Reset everything on logout
    setCurrentUser(null);
    setShowExplanationInput(false);
    setExplanation('');
    setExplanationSubmitted(false);
    setSubmissionMessage('');
  };

  return (
    <div className="App">
      <Header currentUser={currentUser} onLogout={handleLogout} />
      {!currentUser ? (
        <LoginPage onLogin={handleLogin} usersData={usersData} />
      ) : (
        <UserInfo user={currentUser} />
      )}
    </div>
  );
}

export default App;
