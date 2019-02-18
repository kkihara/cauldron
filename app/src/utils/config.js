import os from 'os';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { remote } from 'electron';

const defaultConfig = {
  dbPath: path.join(remote.app.getAppPath(), 'cauldron.db'),
};

let customConfig = {};

try {
  const configPath = path.join(os.homedir(), '.config', 'cauldron', 'config.yml');
  const contents = fs.readFileSync(configPath, 'utf8');
  // TODO: check if customConfig keys are a subset of defaultConfig
  customConfig = yaml.load(contents);
} catch(err) {
  // TODO: alert that config could not be loaded
 console.log(err);
}

export default Object.assign(defaultConfig, customConfig);
