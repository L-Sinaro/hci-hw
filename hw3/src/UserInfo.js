import React, { useState } from 'react';

const UserInfo = ({ user }) => {
  const [hasTakenReading, setHasTakenReading] = useState(null);
  const [bloodSugarReading, setBloodSugarReading] = useState('');

  if (!user) return <div>No user found.</div>;

  const handleReadingConfirmation = (answer) => {
    setHasTakenReading(answer);
  };

  const handleReadingSubmission = () => {
    // Here you would typically send the reading to a server or otherwise process it
    console.log(`Blood sugar reading recorded: ${bloodSugarReading}`);
    setBloodSugarReading('');
    setHasTakenReading(null);
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
