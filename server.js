const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const getDirectoryTree = (dirPath) => {
  const stats = fs.statSync(dirPath);
  if (stats.isDirectory()) {
    return {
      name: path.basename(dirPath),
      type: 'folder',
      children: fs.readdirSync(dirPath).map(file =>
        getDirectoryTree(path.join(dirPath, file))
      ),
    };
  } else {
    return {
      name: path.basename(dirPath),
      type: 'file',
    };
  }
};

app.get('/api/project-structure', (req, res) => {
  const tree = getDirectoryTree(process.cwd()); // current working directory
  res.json(tree);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
