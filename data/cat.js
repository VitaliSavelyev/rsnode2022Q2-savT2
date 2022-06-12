import checkPath from './checkPath.js';
import * as fs from 'fs';

export default async function cat(directory, path) {
  const checkedPath = await checkPath(directory, path);
  if(!checkedPath){
    return 'File not exist!'
  }
  return new Promise((resolve, reject) => {
    const readable = fs.createReadStream(checkedPath);
    const chunks = [];
    readable.on('readable', () => {
      let chunk;
      while (null !== (chunk = readable.read())) {
        chunks.push(chunk);
      }
    });

    readable.on('error', (err) => {
      resolve('Operation failed');
    });

    readable.on('end', () => {
      const content = chunks.join('');
      resolve(content)
    });
  })
}
