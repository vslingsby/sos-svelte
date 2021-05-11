var fs = require('fs');

function multiImport (dir) {
  fs.readdir(dir).forEach( file => {
    console.log(file);
  })
}

exports.multiImport = multiImport;
