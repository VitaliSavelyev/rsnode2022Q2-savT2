import * as fs from 'fs';
import { rm } from './allFunction.js';
import checkPath from './checkPath.js';
import { pipeline } from 'stream';

export default async function mv(directory, path, newDirectory) {
  const checkedPath = await checkPath(directory, path);
  if(!checkedPath){
    return 'File not exist!'
  }
  const massPath = checkedPath.split('\\');
  const fileName = massPath.pop()
  let checkNewDirectory = await checkPath(directory, newDirectory);
  if(!checkNewDirectory) {
    return 'Directory exist!'
  }
  newDirectory = newDirectory + '\\' + fileName;
  return new Promise((resolve, reject) => {
    const readable = fs.createReadStream(checkedPath);
    const writable = fs.createWriteStream(newDirectory)
    pipeline(
        readable,
        writable,
        (err) => {
          if (!err) {
            rm(directory, checkedPath)
            resolve('File moved!')
          } else {
            resolve('Operation failed');
          }
        }
    )
  })
}
