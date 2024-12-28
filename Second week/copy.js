const fs = require('fs').promises;
const path = require('path');

const srcPath = path.join(process.cwd(),'files')
const destPath = path.join(process.cwd(), 'files_copy');

copyAsync(srcPath, destPath);

async function copyAsync(srcDir, targetDir) {
    const srcDirExists = await fs.stat(srcDir).then(() => true).catch(() => false);
    const targetDirExists = await fs.stat(targetDir).then(() => true).catch(() => false);

    try {
        if (!srcDirExists || targetDirExists) {
            throw new Error("Fs operation Failed")
        }
        await copyDirectoryRecursiveAsync(srcDir, targetDir);
        console.log("file has been copied successfully")
    }
    catch (exception) {
        console.log(exception.message)
    } 
}

async function copyDirectoryRecursiveAsync(src, destination){
    var srcEntries = await fs.readdir(src, { withFileTypes: true });
    await fs.mkdir(destination, { recursive: true });

    for (let entry of srcEntries) {
        const srcPath = path.join(src,entry.name)
        const destinationPath = path.join(destination, entry.name);

        if (entry.isDirectory()) {
           
            copyDirectoryRecursiveAsync(entry,destinationPath)
        }
        else if(entry.isFile()) {
            await fs.copyFile(srcPath,destinationPath)
        }
    }

}


