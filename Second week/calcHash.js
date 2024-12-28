const fs = require('fs').promises;
const FS = require('fs')
const path = require('path');
const crypto = require('crypto')

const filePath = path.join(process.cwd(), 'files', 'fileTOCalculateHashFor.txt');

calcHashAsync(filePath);


async function calcHashAsync(filePath) {
    try {
        const isFileExists = fileExists(filePath);
        if (!isFileExists) {
            throw new Error("FS operation failed")
        }

        const readStream = FS.createReadStream(filePath);

        const hash = crypto.createHash('sha256');
        
        readStream.on('data', (chunk) => {
            hash.update(chunk);
          });
      
          readStream.on('end', () => {
            const hashValue = hash.digest('hex');
            console.log(`SHA256 hash: ${hashValue}`);
          });
      
          readStream.on('error', (err) => {
            console.error('Error reading the file:', err.message);
          });
    }
    catch (error) {
        console.log(error.message)
    }
}

async function fileExists(filepath) {
    return await fs.stat(filepath).then(()=>true).catch(()=>false)
}