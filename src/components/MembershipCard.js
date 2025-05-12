import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/membershipcard.css';

const MembershipCard = ({ email, isMember }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/visitors/membership-card?email=${email}`, {
          responseType: 'blob',
        });
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (err) {
        setError('Unable to fetch membership card.');
      }
    };

    if (isMember) fetchCard();
  }, [email, isMember]);

  if (!isMember) return null;

  return (
    <div className="membership-card">
      <h2>My Membership Card</h2>
      {pdfUrl ? (
        <a href={pdfUrl} download="membership_card.pdf">
          <button>Download Membership Card (PDF)</button>
        </a>
      ) : (
        <p>{error || 'Loading...'}</p>
      )}
    </div>
  );
};

export default MembershipCard;