import { Transform } from 'stream';
import { transformData } from './transformData.js';
import { fileURLToPath } from "url";
import { errorTypes } from '../constant/constants.js'
import path from "path";

async function createTransformStream() {
  const transform = new Transform();
  const __filename = fileURLToPath(import.meta.url);
  let dirname = path.dirname(__filename);
  transform._transform = async (chunk, encoding, callback) => {
    const chunkToString = chunk.toString().trim().split(' ');
    let changes = await transformData(chunkToString, dirname);
    if (chunkToString[0] === 'up') {
      if (dirname === changes) {
        changes = 'You in the highest directory'
      } else {
        dirname = changes;
        changes = 'Directory was changed!'
      }
    }
    if (chunkToString[0] === 'cd') {
      if (dirname === changes || !changes) {
        changes = `${errorTypes['INVALID_CATALOG']}`;
      } else {
        dirname = changes;
        changes = 'Directory was changed!';
      }
    }
    if(chunkToString[0] === 'cat' && !changes) {
      changes = `${errorTypes['NOT_FILE']}`;
    }
    callback(null, changes + '\n' + `You are currently in ${dirname}` + '\n');
  };
  return transform;
}

export { createTransformStream };
