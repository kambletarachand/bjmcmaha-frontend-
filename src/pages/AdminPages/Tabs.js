// Tabs.js
import React, { useState } from 'react';
import '../../styles/adminStyles/tabs.css';

export const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const validChildren = React.Children.toArray(children).filter(React.isValidElement);

  return (
    <div className="tabs-container">
      <div className="tab-titles">
        {validChildren.map((child, index) => (
          <div
            key={index}
            className={`tab-title ${activeTab === index ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {child.props.label ?? `Tab ${index + 1}`}
          </div>
        ))}
      </div>
      <div className="tab-content">
        {validChildren[activeTab]}
      </div>
    </div>
  );
};

export const Tab = ({ children }) => {
  return <div>{children}</div>;
};
