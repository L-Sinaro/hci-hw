import React, { useState } from 'react';

const UserInfo = ({ user }) => {
  const [hasTakenReading, setHasTakenReading] = useState(null);
  const [bloodSugarReading, setBloodSugarReading] = useState('');
  const [readingMessage, setReadingMessage] = useState('');
  const [showExplanationInput, setShowExplanationInput] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [explanationSubmitted, setExplanationSubmitted] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  if (!user) return <div>No user found.</div>;

  const handleReadingConfirmation = (hasTaken) => {
    setHasTakenReading(hasTaken);
    // Clear the reading and message if the user hasn't taken the reading yet.
    if (!hasTaken) {
      setBloodSugarReading('');
      setReadingMessage('');
    }
  };

  const handleExplanationSubmission = () => {
    // Here you could send the explanation to a server or handle it otherwise
    console.log(explanation); // For demonstration, simply log it to the console
    setExplanationSubmitted(true);
    setSubmissionMessage('Your explanation has been submitted.');
    // Optionally, clear the explanation state if needed
    setExplanation('');
  };

  const evaluateReading = (reading) => {
    const numericReading = parseInt(reading, 10);
    if (numericReading < user.low_glucose_level) {
      setReadingMessage("Your glucose level is too low. Please eat a sugar source, take your medicine, and eat meals and snacks as described by your doctor.");
      setShowExplanationInput(true);
    } else if (numericReading > user.high_glucose_level) {
      setReadingMessage(`Your glucose level is too high. Please call your doctor immediately. \nDoctor: ${user.doctor_name}, Phone: ${user.doctor_phone_number}. \nDo you have ketones in your urine?`);
      setShowExplanationInput(true);
      // You might want to show additional UI for the ketone question here or handle it as a separate state
    } else {
      setReadingMessage("Your glucose level is normal.");
      setShowExplanationInput(false);
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
          <button className="btn btn-primary me-2" onClick={() => handleReadingConfirmation(true)}>Yes</button> {/* me-2 for margin end on the "Yes" button */}
          <button className="btn btn-secondary ms-2" onClick={() => handleReadingConfirmation(false)}>No</button> {/* ms-2 for margin start on the "No" button */}
        </div>
      )}
      {hasTakenReading && (
        <div className="text-center">
          <label htmlFor="bloodSugarReading" className="form-label">Enter your blood sugar reading:</label>
          <div className="d-flex justify-content-center">
            <input
              type="number"
              className="form-control"
              id="bloodSugarReading"
              value={bloodSugarReading}
              onChange={e => setBloodSugarReading(e.target.value)}
              min="0"
              max="999"
              style={{ width: '300px' }}
            />
          </div>
          <button className="btn btn-success mt-2" onClick={handleReadingSubmission} title="Click this button to submit your blood sugar reading.">Submit</button>
          {readingMessage && (
            <div className={`alert ${readingMessage.includes('too low') ? 'alert-danger' : readingMessage.includes('too high') ? 'alert-warning' : 'alert-success'} mt-2`}>
              {readingMessage.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < readingMessage.split('\n').length - 1 && <br />}
                </span>
              ))}
            </div>
          )}


        </div>
      )}
      {hasTakenReading === false && (
        <div className="text-center mt-3">
          <p>Please take your blood sugar reading immediately.</p>
          <button className="btn btn-success" onClick={() => setHasTakenReading(true)}>I have taken it</button>
        </div>
      )}

      {showExplanationInput && (
        <div className="mt-3">
          <label htmlFor="explanationInput" className="form-label">Please explain why your reading isn't normal:</label>
          <textarea
            id="explanationInput"
            className="form-control"
            value={explanation}
            onChange={e => setExplanation(e.target.value)}
            rows="3"
            title="Enter any factors that might have affected your glucose reading here"
          ></textarea>
          <div className="d-flex justify-content-center"><button className="btn btn-success mt-2" onClick={handleExplanationSubmission}>
            Submit Explanation
          </button></div>

          {explanationSubmitted && <div className="alert alert-success mt-2">{submissionMessage}</div>}
        </div>
      )}
    </div>
  );
};

export default UserInfo;
