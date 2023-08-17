const path = require('path');
const fs   = require('fs');


let prodConnection = {
    "protocol": "http",
    "host": "localhost",
    "port": 3003
}

// "protocol": "http",
// "host": "10.20.2.24",
// "port": 9966

//Delete .next & public folders
console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>PRE PROD<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
console.log(`>>>>>>>>>>>>>>>>>>Deleting .next & public folders<<<<<<<<<<<<<<<<<<`)

try {
    fs.rmdirSync(path.join(__dirname, '../../.next'), { recursive: true });
    //fs.rmdirSync(path.join(__dirname, '../../dist/public'), { recursive: true });
    fs.rmdirSync(path.join(__dirname, '../../src/.next'), { recursive: true });
    fs.unlinkSync(path.join(__dirname, '../public.zip'))
} catch (e) {
    console.log(e.message)
}

console.log(`>>>>>>>>>>>>>>>>>>>>>>Updated Prod connection<<<<<<<<<<<<<<<<<<<<<<`)
console.log(prodConnection)

try {
    fs.writeFileSync(path.join(__dirname, '../../src/services/api', 'index.js'), `export default ${JSON.stringify(prodConnection, null, 4)}`)
} catch (error) {
    console.log(error)
}