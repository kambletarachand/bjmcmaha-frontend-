import React, { useState, useRef, useEffect } from "react";
import Tree from "react-d3-tree";

// Ensure these images are in public/profile images/
const orgData = {
  name: "अध्यक्ष",
  image: "/profile images/p.jpeg",
  children: [
    {
      name: "उपाध्यक्ष 1",
      image: "/profile images/jayesh bhai.jpeg",
      children: [
        {
          name: "सचिव 1",
          image: "/profile images/sec1.jpg",
          children: [
            {
              name: "संयुक्त सचिव 1A",
              image: "/profile images/jsec1a.jpg",
              children: [
                { name: "सदस्य 1", image: "/profile images/mem1.jpg" },
                { name: "सदस्य 2", image: "/profile images/mem2.jpg" },
                { name: "सदस्य 3", image: "/profile images/mem3.jpg" }
              ]
            },
            {
              name: "संयुक्त सचिव 1B",
              image: "/profile images/jsec1b.jpg",
              children: [
                { name: "सदस्य 4", image: "/profile images/mem4.jpg" },
                { name: "सदस्य 5", image: "/profile images/mem5.jpg" },
                { name: "सदस्य 6", image: "/profile images/mem6.jpg" }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "उपाध्यक्ष 2",
      image: "/profile images/vp2.jpg",
      children: [
        {
          name: "सचिव 2",
          image: "/profile images/sec2.jpg",
          children: [
            {
              name: "संयुक्त सचिव 2A",
              image: "/profile images/jsec2a.jpg",
              children: [
                { name: "सदस्य 7", image: "/profile images/mem7.jpg" },
                { name: "सदस्य 8", image: "/profile images/mem8.jpg" },
                { name: "सदस्य 9", image: "/profile images/mem9.jpg" }
              ]
            },
            {
              name: "संयुक्त सचिव 2B",
              image: "/profile images/jsec2b.jpg",
              children: [
                { name: "सदस्य 10", image: "/profile images/mem10.jpg" },
                { name: "सदस्य 11", image: "/profile images/mem11.jpg" },
                { name: "सदस्य 12", image: "/profile images/mem12.jpg" }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "उपाध्यक्ष 3",
      image: "/profile images/vp3.jpg",
      children: [
        {
          name: "सचिव 3",
          image: "/profile images/sec3.jpg",
          children: [
            {
              name: "संयुक्त सचिव 3A",
              image: "/profile images/jsec3a.jpg",
              children: [
                { name: "सदस्य 13", image: "/profile images/mem13.jpg" },
                { name: "सदस्य 14", image: "/profile images/mem14.jpg" },
                { name: "सदस्य 15", image: "/profile images/mem15.jpg" }
              ]
            },
            {
              name: "संयुक्त सचिव 3B",
              image: "/profile images/jsec3b.jpg",
              children: [
                { name: "सदस्य 16", image: "/profile images/mem16.jpg" },
                { name: "सदस्य 17", image: "/profile images/mem17.jpg" },
                { name: "सदस्य 18", image: "/profile images/mem18.jpg" }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "उपाध्यक्ष 4",
      image: "/profile images/vp4.jpg",
      children: [
        {
          name: "सचिव 4",
          image: "/profile images/sec4.jpg",
          children: [
            {
              name: "संयुक्त सचिव 4A",
              image: "/profile images/jsec4a.jpg",
              children: [
                { name: "सदस्य 19", image: "/profile images/mem19.jpg" },
                { name: "सदस्य 20", image: "/profile images/mem20.jpg" },
                { name: "सदस्य 21", image: "/profile images/mem21.jpg" }
              ]
            },
            {
              name: "संयुक्त सचिव 4B",
              image: "/profile images/jsec4b.jpg",
              children: [
                { name: "सदस्य 22", image: "/profile images/mem22.jpg" },
                { name: "सदस्य 23", image: "/profile images/mem23.jpg" },
                { name: "सदस्य 24", image: "/profile images/mem24.jpg" }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "खजिनदार",
      image: "/profile images/treasurer.jpg"
    }
  ]
};

const OrgTree = () => {
  const treeContainer = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (treeContainer.current) {
      const { offsetWidth, offsetHeight } = treeContainer.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  const renderCustomNode = ({ nodeDatum, toggleNode }) => (
    <g>
      {/* Image circle */}
      <circle r={45} fill="#fff" stroke="#333" strokeWidth={2} />
      <defs>
        <clipPath id={`clip-${nodeDatum.name}`}>
          <circle cx="0" cy="0" r="40" />
        </clipPath>
      </defs>
      <image
        href={nodeDatum.image}
        width="80"
        height="80"
        x="-40"
        y="-40"
        clipPath={`url(#clip-${nodeDatum.name})`}
        style={{ cursor: "pointer" }}
        onClick={toggleNode}
      />
      {/* Name label */}
      <text x="0" y="55" textAnchor="middle" fill="#222" fontSize="14" fontWeight="bold">
        {nodeDatum.name}
      </text>
      {/* Info box */}
      <g
        onClick={(e) => {
          e.stopPropagation();
          setProfile(nodeDatum);
        }}
        style={{ cursor: "pointer" }}
      >
        <rect x="25" y="-45" width="20" height="20" fill="#f1f1f1" stroke="#999" rx={5} />
        <text x="35" y="-30" fontSize="12" textAnchor="middle">ℹ️</text>
      </g>
    </g>
  );

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Segoe UI, sans-serif" }}>
      <div ref={treeContainer} style={{ flex: 1, background: "#f8f9fa" }}>
        <Tree
          data={orgData}
          orientation="vertical"
          translate={{ x: dimensions.width / 2, y: 100 }}
          pathFunc="elbow"
          renderCustomNodeElement={renderCustomNode}
          collapsible
          nodeSize={{ x: 250, y: 160 }}
          separation={{ siblings: 1.4, nonSiblings: 1.8 }}
        />
      </div>
      {/* Profile panel */}
      {profile && (
        <div
          style={{
            width: 320,
            background: "#fff",
            borderLeft: "1px solid #ccc",
            padding: 24,
            boxShadow: "-2px 0 8px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <img
            src={profile.image}
            alt={profile.name}
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              border: "4px solid #007bff",
              objectFit: "cover",
              marginBottom: 16
            }}
          />
          <h2 style={{ margin: 0, fontSize: 22 }}>{profile.name}</h2>
          <p style={{ color: "#666", marginTop: 12, textAlign: "center" }}>
            यहाँ {profile.name} का विवरण दिखाया जाएगा। <br /> आप चाहें तो और भी जानकारी जोड़ सकते हैं।
          </p>
          <button
            onClick={() => setProfile(null)}
            style={{
              marginTop: "auto",
              padding: "8px 16px",
              background: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer"
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default OrgTree;
