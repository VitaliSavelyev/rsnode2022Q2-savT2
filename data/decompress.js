import { createBrotliDecompress } from 'zlib'
import { pipeline } from 'stream';
import checkPath from './checkPath.js';
import * as fs from 'fs';


export default async function decompress (directory, path, pathZlib) {
  const checkedPath = await checkPath(directory, path);
  if(!checkedPath){
    return 'File not exist!'
  }
  const massPath = checkedPath.split('\\');
  let fileName = massPath.pop();
  fileName = fileName.slice(0, fileName.lastIndexOf('.'))
  let checkNewDirectory = await checkPath(directory, pathZlib);
  if(!checkNewDirectory) {
    return 'Directory is not exist!';
  }
  checkNewDirectory = pathZlib + '\\' + fileName;
  return new Promise((resolve, reject) => {
    const brotli = createBrotliDecompress()
    const readable = fs.createReadStream(path);
    readable.on("error", (err) => {
      resolve(err)
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
            resolve('File decompress')
          }
        })
  })
};
