import { createBrotliCompress } from 'zlib'
import { pipeline } from 'stream';
import checkPath from './checkPath.js';
import * as fs from 'fs';


export default async function compress (directory, path, pathZlib) {
  const checkedPath = await checkPath(directory, path);
  if(!checkedPath){
    return 'File not exist!'
  }
  const massPath = checkedPath.split('\\');
  const fileName = massPath.pop();
  let checkNewDirectory = await checkPath(directory, pathZlib);
  if(!checkNewDirectory) {
    return 'Directory is not exist!';
  }
  checkNewDirectory = pathZlib + '\\' + fileName + '.br';
  return new Promise((resolve, reject) => {
    const brotli = createBrotliCompress()
    const readable = fs.createReadStream(path);
    readable.on("error", (err) => {
      resolve('Operation failed!')
    });
    const writable = fs.createWriteStream(checkNewDirectory);
    pipeline(
        readable,
        brotli,
        writable,
        (err) => {
          if (err) {
            resolve('Operation failed!')
          } else {
            resolve('File compress')
          }
        })
  })
};
