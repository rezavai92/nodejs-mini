const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(process.cwd(), 'files', 'fileToRead.txt');

readFileAsync(filePath)

async function readFileAsync(filePath) {
    try {
        const filePathExists = await fileExists(filePath);
        if (!filePathExists) {
            throw new Error("FS operation failed")
        }

        const fileContent = await fs.readFile(filePath, { encoding: 'utf-8' })
        
        console.log(fileContent)
    }
    catch (error) {
        console.log(error.message)
    }
    
}

async function fileExists(filepath) {
    return await fs.stat(filepath).then(()=>true).catch(()=>false)
}