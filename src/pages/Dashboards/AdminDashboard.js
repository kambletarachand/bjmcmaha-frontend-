import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/adminStyles/admindashboard.css'; // CSS import


const zones = ['z1', 'z2', 'z3', 'z4', 'z5', 'z6'];
const districts = ['Pune', 'Mumbai', 'Nagpur', 'Nashik', 'Aurangabad', 'Thane', 'Kolhapur', 'Solapur', 'Amravati', 'Latur', 'Sangli', 'Satara', 'Ahmednagar', 'Beed', 'Jalgaon', 'Chandrapur', 'Wardha', 'Yavatmal', 'Gadchiroli', 'Nanded'];

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleType, setRoleType] = useState('');
  const [extra, setExtra] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [tab, setTab] = useState('assign');

  useEffect(() => {
    axios.get('/api/visitors')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const computeFinalRole = () => {
    if (roleType === 'vicepresident') return `vicepresident_${extra.toLowerCase()}`;
    if (['generalsecretary', 'secretary', 'treasurer'].includes(roleType)) return `${roleType}_${extra}`;
    if (roleType === 'districtleader') return `districtleader_${extra.toLowerCase()}`;
    return roleType;
  };

  const handleAssignRole = async () => {
    const finalRole = computeFinalRole();
    try {
      await axios.post('/api/assign-role', {
        email: selectedUser.email,
        role: finalRole
      });
      setSuccessMessage(`✅ Assigned ${finalRole} to ${selectedUser.email}`);
    } catch (err) {
      console.error(err);
      setSuccessMessage('❌ Error assigning role.');
    }
  };

  const handleRemoveRole = async () => {
    try {
      await axios.post('/api/remove-role', { email: selectedUser.email });
      setSuccessMessage(`✅ Removed role from ${selectedUser.email}`);
    } catch (err) {
      console.error(err);
      setSuccessMessage('❌ Error removing role.');
    }
  };

  const handleUpdateRole = async () => {
    const finalRole = computeFinalRole();
    try {
      await axios.post('/api/update-role', {
        email: selectedUser.email,
        newRole: finalRole
      });
      setSuccessMessage(`✅ Updated role to ${finalRole} for ${selectedUser.email}`);
    } catch (err) {
      console.error(err);
      setSuccessMessage('❌ Error updating role.');
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">⚙️ Admin Dashboard</h2>

      <div className="tab-buttons">
        <button className={tab === 'assign' ? 'active' : ''} onClick={() => setTab('assign')}>Assign Role</button>
        <button className={tab === 'update' ? 'active' : ''} onClick={() => setTab('update')}>Update Role</button>
        <button className={tab === 'remove' ? 'active' : ''} onClick={() => setTab('remove')}>Remove Role</button>
      </div>

      <div className="form-section">
        <label>Select User:</label>
        <select onChange={(e) => setSelectedUser(JSON.parse(e.target.value))}>
          <option>Select a user</option>
          {users.map(user => (
            <option key={user.email} value={JSON.stringify(user)}>
              {user.email} ({user.role || 'no role'})
            </option>
          ))}
        </select>
      </div>

      {(tab === 'assign' || tab === 'update') && (
        <>
          <div className="form-section">
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
            <div className="form-section">
              <label>Select Zone:</label>
              <select onChange={(e) => setExtra(e.target.value)}>
                <option>Select Zone</option>
                {zones.map(z => <option key={z} value={z}>{z.toUpperCase()}</option>)}
              </select>
            </div>
          )}

          {['generalsecretary', 'secretary', 'treasurer'].includes(roleType) && (
            <div className="form-section">
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
            <div className="form-section">
              <label>Select District:</label>
              <select onChange={(e) => setExtra(e.target.value)}>
                <option>Select District</option>
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          )}
        </>
      )}

      <div className="form-section">
        {tab === 'assign' && selectedUser && roleType && (
          <button className="action-button" onClick={handleAssignRole}>Assign Role</button>
        )}
        {tab === 'update' && selectedUser && roleType && (
          <button className="action-button" onClick={handleUpdateRole}>Update Role</button>
        )}
        {tab === 'remove' && selectedUser && (
          <button className="action-button" onClick={handleRemoveRole}>Remove Role</button>
        )}
      </div>

      {successMessage && <p className="message">{successMessage}</p>}
    </div>
  );
};

export default AdminDashboard;
