// AdminNewsManager.jsx

import React, { useState, useEffect } from 'react';
import '../../styles/adminStyles/adminSection.css';


const AdminNewsManager = () => {
  const [newsList, setNewsList] = useState([]);
  const [formData, setFormData] = useState({ title: '', summary: '', url: '' });

  useEffect(() => {
    fetch('http://localhost:8989/api/internal-news')  // Adjust endpoint as needed
      .then(res => res.json())
      .then(data => setNewsList(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8989/api/internal-news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(() => {
      alert("News Posted");
      window.location.reload();
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8989/api/internal-news/${id}`, { method: 'DELETE' })
      .then(() => window.location.reload());
  };

  return (
    <div>
      <h3>Manage News</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" onChange={e => setFormData({...formData, title: e.target.value})} />
        <textarea placeholder="Summary" onChange={e => setFormData({...formData, summary: e.target.value})} />
        <input placeholder="URL" onChange={e => setFormData({...formData, url: e.target.value})} />
        <button type="submit">Add News</button>
      </form>

      <ul>
        {newsList.map(n => (
          <li key={n.id}>
            <strong>{n.title}</strong>
            <button onClick={() => handleDelete(n.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AdminNewsManager;