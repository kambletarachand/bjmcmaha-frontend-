import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { BASE_URL } from '../utils/constants';
import '../styles/governmentSchemes.css';

const GovernmentSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const [labourRes, pmYojnaRes, jobCardRes] = await Promise.all([
          axios.get(`${BASE_URL}/schemes/labour`),
          axios.get(`${BASE_URL}/schemes/pradhanmantri-yojna`),
          axios.get(`${BASE_URL}/schemes/govt-job-cards`)
        ]);

        const labourSchemes = labourRes.data.map(s => ({ ...s, category: 'Labour & Employees' }));
        const yojnaSchemes = pmYojnaRes.data.map(s => ({ ...s, category: 'Pradhan Mantri Yojna' }));
        const jobCardSchemes = jobCardRes.data.map(s => ({ ...s, category: 'Govt Job Cards' }));

        const allSchemes = [...labourSchemes, ...yojnaSchemes, ...jobCardSchemes];
        setSchemes(allSchemes);
        setFilteredSchemes(allSchemes);
      } catch (error) {
        console.error('Error fetching government schemes:', error);
      }
    };

    fetchSchemes();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    const filtered = schemes.filter(scheme =>
      scheme.title.toLowerCase().includes(query) ||
      scheme.category.toLowerCase().includes(query)
    );
    setFilteredSchemes(filtered);
  };

  return (
    <Layout>
      <div className="schemes-container">
        <h1>Government Schemes for Labour & Employees</h1>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by scheme name or category..."
          className="search-bar"
        />
        <div className="schemes-list">
          {filteredSchemes.length === 0 ? (
            <p>No schemes found.</p>
          ) : (
            filteredSchemes.map((scheme, index) => (
              <div key={index} className="scheme-card">
                <h2>{scheme.title}</h2>
                <p><strong>Category:</strong> {scheme.category}</p>
                <p>{scheme.description}</p>
                <a href={scheme.url} target="_blank" rel="noreferrer">More Details</a>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GovernmentSchemes;
