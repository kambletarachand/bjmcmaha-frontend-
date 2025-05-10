// JoinUs.js
import React, { useState } from 'react';
import Layout from '../components/Layout';
import '../styles/joinus.css';
import MobileVerificationFirebase from './LoginPages/MobileVerificationFirebase';
import MembershipForm from './LoginPages/MembershipForm';

const JoinUs = () => {
  const [verifiedPhone, setVerifiedPhone] = useState(null);

  const handleVerification = (phone) => {
    setVerifiedPhone(phone);
  };

  return (
    <Layout>
      <div className="section-banner">
        <div className="section-content">
          <h1>Join Us</h1>
          <h2>Become a Member of BJMC Maharashtra</h2>
          <p>Join hands with us to contribute towards journalistic freedom and media empowerment in Maharashtra.</p>
        </div>
      </div>

      {/* Show OTP verification or membership form based on state */}
      {!verifiedPhone ? (
        <MobileVerificationFirebase onVerified={handleVerification} />
      ) : (
        <MembershipForm verifiedPhone={verifiedPhone} />
      )}
    </Layout>
  );
};

export default JoinUs;
