// MembershipForm.js
import React, { useState } from 'react';

const MembershipForm = ({ verifiedPhone }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Member');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, phone: verifiedPhone, role };

    try {
      const res = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      setStatus(data.message || 'Member saved!');
    } catch (err) {
      console.error('Error:', err);
      setStatus('Failed to save member');
    }
  };

  return (
    <div className="membership-form">
      <h3>Welcome! Please Complete Your Membership</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Member">Member</option>
          <option value="Volunteer">Volunteer</option>
          <option value="Media Person">Media Person</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default MembershipForm;
