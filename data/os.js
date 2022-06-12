import { errorTypes } from '../constant/constants.js';
import * as os from 'os';

export default async function osAll (command) {
  return new Promise((resolve, reject) => {
    switch (command) {
      case '--EOL':
        resolve(JSON.stringify(os.EOL))
        break;
      case '--cpus':
        const data = os.cpus().map(elem => {
          return { model: elem.model, speed: `${(elem.speed / 1000).toFixed(2)} GHz` }
        })
        resolve(data)
        break;
      case '--homedir':
        resolve(os.homedir())
        break;
      case '--username':
        resolve(os.hostname())
        break;
      case '--architecture':
        resolve(os.arch())
        break;
      default :
        resolve(`${errorTypes['INVALID_INPUT']}`);
    }
  })
}
