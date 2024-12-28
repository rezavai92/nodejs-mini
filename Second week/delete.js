const fs = require('fs').promises;
const path = require('path');

const deletableFilePath = path.join(process.cwd(), 'delete-ops', 'fileToRemove.txt');

deleteFileAsync(deletableFilePath);

async function deleteFileAsync(filePath) {
    try {
        const removableFileExists = await fileExists(filePath);

        if (!removableFileExists) {
            throw new Error("FS operation failed")
        }

        await fs.rm(filePath);

        console.log("file removed successfully")
    }
    catch (error) {
        console.log(error.message)
    }
}


async function fileExists(filepath) {
    return await fs.stat(filepath).then(()=>true).catch(()=>false)
}