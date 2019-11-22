const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'filename', alias: 'f', type: String, defaultValue: 'db.xml' },
];

const options = commandLineArgs(optionDefinitions);

console.log(options);

module.exports = options;
