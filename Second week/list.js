const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(process.cwd(), "files");
printFileNamesAsync(filePath);


async function printFileNamesAsync(filePath) {
    try {
        const dirs = await fs.readdir(filePath, {
            withFileTypes : true
        });

        for (let dir of dirs) {
         if (dir.isFile()) {
                console.log(dir.name)
            }
        }
    }
    catch (error) {
        console.log(error.message)
    }
  
}