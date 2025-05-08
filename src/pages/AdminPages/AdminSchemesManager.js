// AdminSchemesManager.jsx

import React, { useState, useEffect } from 'react';
import '../../styles/adminStyles/adminSection.css';


 const AdminSchemesManager = () => {
  const [schemes, setSchemes] = useState([]);
  const [formData, setFormData] = useState({ name: '', summary: '', link: '' });

  useEffect(() => {
    fetch('/api/schemes')
      .then(res => res.json())
      .then(data => setSchemes(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/schemes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(() => {
      alert("Scheme Added");
      window.location.reload();
    });
  };

  const handleDelete = (id) => {
    fetch(`/api/schemes/${id}`, { method: 'DELETE' })
      .then(() => window.location.reload());
  };

  return (
    <div>
      <h3>Manage Schemes</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Scheme Name" onChange={e => setFormData({ ...formData, name: e.target.value })} />
        <textarea placeholder="Summary" onChange={e => setFormData({ ...formData, summary: e.target.value })} />
        <input placeholder="Link" onChange={e => setFormData({ ...formData, link: e.target.value })} />
        <button type="submit">Add Scheme</button>
      </form>

      <ul>
        {schemes.map(s => (
          <li key={s.id}>
            <strong>{s.name}</strong>
            <button onClick={() => handleDelete(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSchemesManager;
