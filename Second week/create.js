const fs = require('fs').promises;
const path = require('path');

async function createFreshFile() {
  const dirPath = path.join(process.cwd(), 'files');
  const filePath = path.join(dirPath, 'fresh.txt');
  const fileContent = 'I am fresh and young';

  try {
   
    const fileExists = await fs.stat(filePath).then(() => true).catch(() => false);
    if (fileExists) {
      throw new Error('FS operation failed');
    }
    
    await fs.mkdir(dirPath, { recursive: true });
      await fs.writeFile(filePath, fileContent);
      
    console.log(`File created successfully at: ${filePath}`);
  } catch (error) {
    console.error(error.message);
  }
}

createFreshFile();
