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

  const handleLogin = (fullName) => {
    const user = usersData.find(user => user.name === fullName);
    setCurrentUser(user);
  };

  const toggleHelp = () => {
    setShowHelp(prevShowHelp => !prevShowHelp);
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
          right: '20px', // Change from left to right
          fontSize: '24px', // Bigger font size for a bigger icon
          padding: '10px', // Increase padding for a larger button
          zIndex: '1000' // Ensure it's above other content
        }}
      >
        <FaQuestionCircle />
      </button>

      {showHelp && (
        <div className="popover-content">
          {/* Your help content goes here */}
        </div>
      )}
    </div>
  );
}

export default App;
