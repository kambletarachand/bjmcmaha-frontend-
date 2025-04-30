import React, { useEffect, useState } from 'react';

const TreeNode = ({ node }) => {
  const isFolder = node.type === 'folder';

  return (
    <div style={{ marginLeft: 20 }}>
      <div><strong>{isFolder ? '📁' : '📄'} {node.name}</strong></div>
      {isFolder && node.children && node.children.map((child, idx) => (
        <TreeNode key={idx} node={child} />
      ))}
    </div>
  );
};

const ProjectTree = () => {
  const [tree, setTree] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/project-structure')
      .then(res => res.json())
      .then(data => setTree(data))
      .catch(err => console.error('Error fetching structure:', err));
  }, []);

  return (
    <div className="p-4 font-mono text-sm">
      <h1 className="text-xl font-bold mb-4">📂 Project Structure</h1>
      {tree ? <TreeNode node={tree} /> : <p>Loading...</p>}
    </div>
  );
};

export default ProjectTree;
