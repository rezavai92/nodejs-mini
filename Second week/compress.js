const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const zlib = require('zlib')

const filePath = path.join(process.cwd(), 'files','fileToCompress.txt');

compressFileAsync(filePath);


async function compressFileAsync(filePath) {
    const outputFilePath = path.join(process.cwd(), 'archive.gz');
    try {
       
        const srcFileExists = await fileExists(filePath)
        if (!srcFileExists ) {
            throw new Error("FS operation failed")
        }

        const readStream = fs.createReadStream(filePath);
        const writeStream = fs.createWriteStream(outputFilePath)
    
        const gzip = zlib.createGzip();

        readStream.pipe(gzip).pipe(writeStream);

        writeStream.on('finish', () => {
            console.log(`File successfully compressed to: ${outputFilePath}`);
          });
      
          writeStream.on('error', (err) => {
            console.error('Error during write operation:', err.message);
          });
      
          readStream.on('error', (err) => {
            console.error('Error reading the input file:', err.message);
          });
      
          gzip.on('error', (err) => {
            console.error('Error during compression:', err.message);
          });
    }
    catch (error) {
        console.log(error.message)
    }
   
}

async function fileExists(filepath) {
    return await fsp.stat(filepath).then(()=>true).catch(()=>false)
}