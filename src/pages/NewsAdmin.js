import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/newsAdmin.css'; // Create and style as needed

const NewsAdmin = () => {
  const [newsList, setNewsList] = useState([]);
  const [form, setForm] = useState({
    title: '',
    content: '',
    imageUrl: ''
  });

  // Fetch news on component mount
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/news');
      setNewsList(res.data);
    } catch (err) {
      console.error('Error fetching news:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/admin/news', form);
      setForm({ title: '', content: '', imageUrl: '' });
      fetchNews(); // Refresh list
    } catch (err) {
      console.error('Error submitting news:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this news item?')) return;
    try {
      await axios.delete(`http://localhost:8080/api/admin/news/${id}`);
      fetchNews(); // Refresh list
    } catch (err) {
      console.error('Error deleting news:', err);
    }
  };

  return (
    <div className="news-admin">
      <h2>Upload News</h2>
      <form onSubmit={handleSubmit} className="news-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
        />
        <button type="submit">Post News</button>
      </form>

      <h2>All News</h2>
      <table className="news-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date Posted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {newsList.map((news) => (
            <tr key={news.id}>
              <td>{news.title}</td>
              <td>{new Date(news.datePosted).toLocaleString()}</td>
              <td>
                <button onClick={() => handleDelete(news.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewsAdmin;
