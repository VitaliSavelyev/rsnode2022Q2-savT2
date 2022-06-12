import { createHash } from 'crypto';
import checkPath from './checkPath.js';
import * as fs from 'fs';


export default async function compress(directory, path) {
  const checkedPath = await checkPath(directory, path);
  if(!checkedPath){
    return 'File not exist!'
  }
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256')
    const readable = fs.createReadStream(checkedPath);
    readable.on("error", (err) => {
      resolve('Operation failed')
    });
    readable.on("data", (data) => {
      hash.update(data)
    });
    readable.on("end", (err) => {
      if(err){
        resolve('Operation failed')
      }
      resolve(`Hash: ${hash.digest("hex")}`)
    });
  })
};
