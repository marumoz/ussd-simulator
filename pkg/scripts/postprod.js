//zip public some folder to some folder
var shell = require('shelljs');
const path = require('path');
const fs   = require('fs');

let releaseDate = require('moment')().format('YYYY-MM-DD');

console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>POST PROD<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
console.log(`>>>>>>>>>>>>>>>>>>>>>Zipping src & public Folders<<<<<<<<<<<<<<<<<<<<<<<`)

//shell.exec(`7z a ./pkg/src-${releaseDate}.zip ./ -xr!node_modules -xr!pkg -xr!TODO`)
shell.exec(`7z a ./pkg/public.zip ./dist/public`);


//fs writeSync localhost
let localConnection = {
    "protocol": "http",
    "host": "127.0.0.1",
    "port": 3356
}

console.log(`>>>>>>>>>>>>>>>>>>>>>>>>Return to localhost<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)

try {
    fs.writeFileSync(path.join(__dirname, '../../src/services/api', 'index.js'), `export default ${JSON.stringify(localConnection, null, 4)}`)
} catch (error) {
    console.log(error)
}


console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>Launching dev<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)