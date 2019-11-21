const parser = require('xml2json');
// const read = require('read-file');
const fs = require('fs');
const options = require('./index.js');
// imporSSSSt writSSeFile frSom 'write'
// import shell from 'shelljs'

console.log(options);

let parsedContent;

fs.readFile(options.filename.toString(), (err, data) => {
  console.log(options.filename);
  console.log(data);
  const string = parser.toJson(data);
  console.log(string);

  const jsonFile = JSON.parse(string);
  console.log(jsonFile);
  parsedContent = jsonFile.AuditFile;
  delete parsedContent['xmlns:xsi'];
  delete parsedContent['xmlns:xsd'];
  delete parsedContent['xsi:schemaLocation'];
  delete parsedContent.xmlns;

  fs.writeFileSync('../db.json', JSON.stringify(parsedContent), err2 => {
    if (err2) {
      console.log('error');
    }
  });
});
