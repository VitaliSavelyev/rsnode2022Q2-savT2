import { errorTypes } from '../constant/constants.js';
import checkDifficultPath from '../data/checkDifficultPath.js'
import {
  ls,
  osAll,
  changeDirectoryUp,
  changeDirectoryCd,
  cat,
  add,
  rn,
  rm,
  cp,
  mv,
  compress,
  decompress,
  hash
} from '../data/allFunction.js';

async function transformData(command, directory) {
  const path = checkDifficultPath(command);
  let data;
  switch (command[0]) {
    case 'up':
      data = await changeDirectoryUp(directory);
      break;
    case 'cd':
      if(!path.length) {
        data = ''
      } else {
        data = await changeDirectoryCd(directory, path[0]);
      }
      break;
    case 'ls':
      data = await ls(directory);
      break;
    case 'os':
      data = await osAll(command[1]);
      break;
    case 'cat':
      if(!path.length) {
        data = '';
      } else {
        data = await cat(directory, path[0])
      }
      break;
    case 'add':
      if(!path.length) {
        data = `${errorTypes['INVALID_INPUT']}`
      } else {
        data = await add(directory, path[0]);
      }
      break;
    case 'rn':
      if(!path.length) {
        data = `${errorTypes['INVALID_INPUT']}`
      } else {
        data = await rn(directory, path[0], path[1]);
      }
      break;
    case 'rm':
      if(!path.length) {
        data = `${errorTypes['INVALID_INPUT']}`
      } else {
        data = await rm(directory, path[0]);
      }
      break;
    case 'cp':
      if(!path.length) {
        data = `${errorTypes['INVALID_INPUT']}`
      } else {
        if (!path[1]) {
          data = `${errorTypes['INVALID_INPUT']}`
        } else {
          data = await cp(directory, path[0], path[1]);
        }
      }
      break;
    case 'mv':
      if(!path.length) {
        data = `${errorTypes['INVALID_INPUT']}`
      } else {
        if (!path[1]) {
          data = `${errorTypes['INVALID_INPUT']}`
        } else {
          data = await mv(directory, path[0], path[1]);
        }
      }
      break;
    case 'compress':
      if(!path.length) {
        data = `${errorTypes['INVALID_INPUT']}`
      } else {
        data = await compress(directory, path[0], path[1]);
      }
      break;
    case 'decompress':
      if(!path.length) {
        data = `${errorTypes['INVALID_INPUT']}`
      } else {
        data = await decompress(directory, path[0], path[1]);
      }
      break;
    case 'hash':
      if(!path.length) {
        data = `${errorTypes['INVALID_INPUT']}`
      } else {
        data = await hash(directory, path[0]);
      }
      break;
    default:
      data = `${errorTypes['INVALID_INPUT']}`
      break;
  }
  return typeof data !== "string" ? JSON.stringify(data) : data;
}

export { transformData };
