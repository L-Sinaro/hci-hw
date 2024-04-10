import React, { useState } from 'react';

const UserInfo = ({ user }) => {
  const [hasTakenReading, setHasTakenReading] = useState(null);
  const [bloodSugarReading, setBloodSugarReading] = useState('');
  const [readingMessage, setReadingMessage] = useState('');

  if (!user) return <div>No user found.</div>;

  const handleReadingConfirmation = (hasTaken) => {
    setHasTakenReading(hasTaken);
    // Clear the reading and message if the user hasn't taken the reading yet.
    if (!hasTaken) {
      setBloodSugarReading('');
      setReadingMessage('');
    }
  };

  const evaluateReading = (reading) => {
    const numericReading = parseInt(reading, 10);
    if (numericReading < user.low_glucose_level) {
      setReadingMessage("Your glucose level is too low.");
    } else if (numericReading > user.high_glucose_level) {
      setReadingMessage("Your glucose level is too high.");
    } else {
      setReadingMessage("Your glucose level is normal.");
    }
  };

  const handleReadingSubmission = () => {
    if (bloodSugarReading !== '') {
      evaluateReading(bloodSugarReading);
      console.log(`Blood sugar reading recorded: ${bloodSugarReading}`);
      // Optionally reset the blood sugar reading input and the prompt
      // setBloodSugarReading('');
      // setHasTakenReading(null);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 56px)' }}>
      <div className="card" style={{ width: '24rem', marginBottom: '20px' }}>
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text">ID: {user.id}</p>
          <p className="card-text">Doctor: {user.doctor_name} ({user.doctor_phone_number})</p>
          <p className="card-text">Low Glucose Level: {user.low_glucose_level}</p>
          <p className="card-text">Normal Glucose Range: {user.normal_glucose_level}</p>
          <p className="card-text">High Glucose Level: {user.high_glucose_level}</p>
        </div>
      </div>
      {hasTakenReading === null && (
        <div className="text-center">
          <p>Have you taken your blood sugar reading today?</p>
          <button className="btn btn-primary mr-2" onClick={() => handleReadingConfirmation(true)}>Yes</button>
          <button className="btn btn-secondary" onClick={() => handleReadingConfirmation(false)}>No</button>
        </div>
      )}
      {hasTakenReading && (
        <div className="text-center">
          <label htmlFor="bloodSugarReading" className="form-label">Enter your blood sugar reading:</label>
          <input 
            type="number" 
            className="form-control" 
            id="bloodSugarReading"
            value={bloodSugarReading}
            onChange={e => setBloodSugarReading(e.target.value)}
            min="0" 
            max="999" 
          />
          <button className="btn btn-success mt-2" onClick={handleReadingSubmission}>Submit</button>
          {readingMessage && (
            <div className={`alert ${readingMessage.includes('too low') || readingMessage.includes('too high') ? 'alert-danger' : 'alert-info'} mt-2`}>
              {readingMessage}
            </div>
          )}
        </div>
      )}
      {hasTakenReading === false && (
        <div className="text-center mt-3">
          <p>Please take your blood sugar reading immediately.</p>
          <button className="btn btn-success" onClick={() => setHasTakenReading(true)}>I've taken it</button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
