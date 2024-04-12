import React, { useState } from 'react';
import Header from './Header'; // Make sure the path is correct
import LoginPage from './LoginPage';
import UserInfo from './UserInfo';
import usersData from './patient_data.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaQuestionCircle } from 'react-icons/fa'; // Using react-icons for the question mark icon

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showExplanationInput, setShowExplanationInput] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [explanationSubmitted, setExplanationSubmitted] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const toggleHelp = () => {
    setShowHelp(prev => !prev); // Toggle the visibility of the help content
  };

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
      <button
        onClick={toggleHelp}
        className="btn help-button"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          fontSize: '24px',
          zIndex: '1050' // Higher z-index to keep it on top
        }}
      >
        <FaQuestionCircle />
      </button>


      {showHelp && (
        <div style={{
          position: 'fixed',
          bottom: '70px', // Position it above the button
          right: '20px',
          backgroundColor: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: '1050' // Same z-index to keep it on top
        }}>
          Please select your name to display your information.
        </div>
      )}
    </div>
  );
}

export default App;
