// Tabs.jsx

import React, { useState } from 'react';

import '../../styles/adminStyles/tabs.css';

export const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs-container">
      <div className="tab-titles">
        {React.Children.map(children, (child, index) => (
          <div
            className={`tab-title ${activeTab === index ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {child.props.label}
          </div>
        ))}
      </div>
      <div className="tab-content">
        {React.Children.toArray(children)[activeTab]}
      </div>
    </div>
  );
};

export const Tab = ({ children }) => {
  return <div>{children}</div>;
};
