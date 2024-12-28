const fs = require('fs').promises;
const path = require('path');

const renameDir = path.join(__dirname, 'rename-ops');

const oldPath = path.join(renameDir,'wrongFilename.txt');
const newPath = path.join(renameDir, 'properFilename.md');

renameFileAsync(oldPath, newPath);


async function renameFileAsync(oldPath, newPath) {
    try {
        const srcFileExists = await fileExists(oldPath);
        const targetFileExists = await fileExists(newPath);
        if (!srcFileExists || targetFileExists) {
            throw new Error("FS operation failed")
        }
    
        await fs.rename(oldPath,newPath)
    }
    catch (error) {
        console.log(error.message)
    }
   
}

async function fileExists(filepath) {
    return await fs.stat(filepath).then(()=>true).catch(()=>false)
}