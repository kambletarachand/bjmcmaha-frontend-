import React, { useEffect, useState } from 'react';
import axios from 'axios';

const zones = ['z1', 'z2', 'z3', 'z4', 'z5', 'z6'];
const districts = ['Pune', 'Mumbai', 'Nagpur', 'Nashik', 'Aurangabad', 'Thane', 'Kolhapur', 'Solapur', 'Amravati', 'Latur', 'Sangli', 'Satara', 'Ahmednagar', 'Beed', 'Jalgaon', 'Chandrapur', 'Wardha', 'Yavatmal', 'Gadchiroli', 'Nanded'];

const RoleAssignmentPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleType, setRoleType] = useState('');
  const [extra, setExtra] = useState(''); // zone or district
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios.get('/api/visitors?role=visitor') // Create this endpoint to get all visitor role users
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAssignRole = async () => {
    let finalRole = roleType;

    if (roleType === 'vicepresident') finalRole = `vicepresident_${extra.toLowerCase()}`;
    if (roleType === 'generalsecretary') finalRole = `generalsecretary_${extra}`;
    if (roleType === 'secretary') finalRole = `secretary_${extra}`;
    if (roleType === 'treasurer') finalRole = `treasurer_${extra}`;
    if (roleType === 'districtleader') finalRole = `districtleader_${extra.toLowerCase()}`;

    try {
      await axios.post('/api/assign-role', {
        email: selectedUser.email,
        role: finalRole
      });
      setSuccessMessage(`Assigned ${finalRole} to ${selectedUser.email}`);
    } catch (err) {
      console.error(err);
      setSuccessMessage('Error assigning role.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Role Assignment Panel (Admin Only)</h2>
      <div>
        <label>Select User:</label>
        <select onChange={(e) => setSelectedUser(JSON.parse(e.target.value))}>
          <option>Select a user</option>
          {users.map((user) => (
            <option key={user.email} value={JSON.stringify(user)}>
              {user.email}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Role:</label>
        <select onChange={(e) => {
          setRoleType(e.target.value);
          setExtra('');
        }}>
          <option>Select Role</option>
          <option value="president">President</option>
          <option value="vicepresident">Vice President</option>
          <option value="generalsecretary">General Secretary</option>
          <option value="secretary">Secretary</option>
          <option value="treasurer">Treasurer</option>
          <option value="member">Member</option>
          <option value="districtleader">District Leader</option>
        </select>
      </div>

      {roleType === 'vicepresident' && (
        <div>
          <label>Select Zone:</label>
          <select onChange={(e) => setExtra(e.target.value)}>
            <option>Select Zone</option>
            {zones.map(z => <option key={z} value={z}>{z.toUpperCase()}</option>)}
          </select>
        </div>
      )}

      {(roleType === 'generalsecretary' || roleType === 'secretary' || roleType === 'treasurer') && (
        <div>
          <label>Number:</label>
          <select onChange={(e) => setExtra(e.target.value)}>
            <option>Select Number</option>
            {[...Array(8)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
      )}

      {roleType === 'districtleader' && (
        <div>
          <label>Select District:</label>
          <select onChange={(e) => setExtra(e.target.value)}>
            <option>Select District</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      )}

      {selectedUser && roleType && (
        <button onClick={handleAssignRole} style={{ marginTop: '1rem' }}>Assign Role</button>
      )}

      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default RoleAssignmentPage;
