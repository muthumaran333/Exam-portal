const fs = require('fs');
const path = require('path');

const outputFilePath = path.join(__dirname, 'folderstructure.txt');
let output = '';

function listFolderStructure(dir, indent = '') {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const isDirectory = fs.statSync(fullPath).isDirectory();
    const line = indent + (isDirectory ? '📁 ' : '📄 ') + item + '\n';
    
    output += line;

    if (isDirectory) {
      listFolderStructure(fullPath, indent + '  ');
    }
  }
}

// Start from the current working directory
const currentDir = process.cwd();
output += 'Project Folder Structure:\n\n';
listFolderStructure(currentDir);

// Write to folderstructure.txt
fs.writeFileSync(outputFilePath, output, 'utf8');

console.log(`📄 Folder structure saved to: ${outputFilePath}`);
