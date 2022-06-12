import * as fs from 'fs';
import checkPath from './checkPath.js';
import { pipeline } from "stream";

export default async function cp(directory, path, newDirectory) {
  const checkedPath = await checkPath(directory, path);
  if(!checkedPath){
    return 'File not exist!'
  }
  const massPath = checkedPath.split('\\');
  const fileName = massPath.pop()
  let checkNewDirectory = await checkPath(directory, newDirectory);
  if(!checkNewDirectory) {
    return 'Directory is not exist!'
  }
  checkNewDirectory = checkNewDirectory + '\\' + fileName;
  return new Promise((resolve, reject) => {
    const readable = fs.createReadStream(checkedPath);
    const writable = fs.createWriteStream(checkNewDirectory)
    pipeline(
        readable,
        writable,
        (err) => {
          if (!err) {
            resolve('File copied')
          } else {
            console.log('err', err)
            resolve('Operation failed!')
          }
        }
    )
  })
}
