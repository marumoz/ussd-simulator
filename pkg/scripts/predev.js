const path = require('path');
const fs   = require('fs');

//Delete .next & public folders
console.log('>'.repeat(37)+`PRE DEV`+ '<'.repeat(37))
console.log('>'.repeat(37)+`Deleting .next folder`+ '<'.repeat(37))

try {
    fs.rmdirSync(path.join(__dirname, '../../.next'), { recursive: true });
    fs.rmdirSync(path.join(__dirname, '../../src/.next'), { recursive: true });
} catch (e) {
    console.log(e.message)
}

console.log('>'.repeat(37)+`Successful 🚀🚀🚀🚀🚀🚀`+ '<'.repeat(37))