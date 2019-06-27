const os = require('os');
const fs = require('fs');
const path = require('path');

let defaultConfig = {};

let customConfig = {};

try {
  const configPath = path.join(os.homedir(), '.config', 'cauldron', 'config.json');
  customConfig = require(configPath);
  // TODO: check if customConfig keys are a subset of defaultConfig
} catch(err) {
  // TODO: alert that config could not be loaded
 console.log(err);
}

module.exports = Object.assign(defaultConfig, customConfig);
