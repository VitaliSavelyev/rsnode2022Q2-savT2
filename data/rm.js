import * as fs from 'fs';
import checkPath from './checkPath.js';

export default async function rm(directory, path) {
  const checkedPath = await checkPath(directory, path);
  if(!checkedPath){
    return 'File not exist!'
  }
  return new Promise((resolve, reject) => fs.rm(checkedPath, (err) => {
    if(err) {
      return resolve('Operation failed')
    }
    return resolve('File deleted!')
  }))
};
