// import React, { useState } from 'react';
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// // import { auth } from '../../config/FirebaseConfig';

// const MobileVerificationFirebase = ({ onVerified }) => {
//   const [phone, setPhone] = useState('');
//   const [otp, setOtp] = useState('');
//   const [confirmation, setConfirmation] = useState(null);

//   const setupRecaptcha = () => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         auth, // ✅ Correct parameter order
//         'recaptcha-container',
//         {
//           size: 'invisible',
//           callback: (response) => {
//             console.log('Recaptcha resolved');
//           },
//         }
//       );
//     }
//   };

//   const sendOtp = async () => {
//     setupRecaptcha();
//     const appVerifier = window.recaptchaVerifier;
//     const fullPhone = '+91' + phone;

//     try {
//       const result = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
//       setConfirmation(result);
//       alert('OTP sent!');
//     } catch (error) {
//       console.error('SMS not sent:', error);
//       alert('Failed to send OTP: ' + error.message);
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       await confirmation.confirm(otp);
//       alert('Phone verified!');
//       onVerified(phone);
//     } catch (error) {
//       alert('Invalid OTP');
//     }
//   };

//   return (
//     <div className="verification-box">
//       <div id="recaptcha-container"></div>
//       {!confirmation ? (
//         <>
//           <h3>Enter Your Mobile Number</h3>
//           <input
//             type="tel"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="Enter phone number"
//           />
//           <button onClick={sendOtp}>Send OTP</button>
//         </>
//       ) : (
//         <>
//           <h3>Enter OTP sent to +91{phone}</h3>
//           <input
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             placeholder="Enter OTP"
//           />
//           <button onClick={verifyOtp}>Verify OTP</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default MobileVerificationFirebase;
