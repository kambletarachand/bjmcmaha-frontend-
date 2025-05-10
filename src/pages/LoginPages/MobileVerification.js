import React, { useState } from 'react';
import '../../styles/login_css/mobileverification.css'; // Make sure this path is correct

const MobileVerification = ({ onVerified }) => {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));
  const [correctOtp, setCorrectOtp] = useState('');

  const sendOtp = () => {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setCorrectOtp(generatedOtp);
    setOtpSent(true);
    console.log('OTP (simulate SMS):', generatedOtp); // Simulated SMS
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const updatedOtp = [...otpDigits];
      updatedOtp[index] = value;
      setOtpDigits(updatedOtp);

      // Move to next input
      if (value && index < 5) {
        const next = document.getElementById(`otp-${index + 1}`);
        next?.focus();
      }
    }
  };

  const verifyOtp = () => {
    const enteredOtp = otpDigits.join('');
    if (enteredOtp === correctOtp) {
      onVerified(phone);
    } else {
      alert('Incorrect OTP. Please try again.');
    }
  };

  return (
    <div className="verification-box">
      {!otpSent ? (
        <>
          <h3>Enter Your Mobile Number</h3>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter mobile number"
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <h3>Enter the OTP sent to {phone}</h3>
          <div className="otp-input-container">
            {otpDigits.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                className="otp-digit"
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e, idx)}
              />
            ))}
          </div>
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
};

export default MobileVerification;
