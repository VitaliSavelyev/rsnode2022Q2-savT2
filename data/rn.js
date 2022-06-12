import checkPath from './checkPath.js';
import * as fs from 'fs';

export default async function rn(directory, path, name) {
  const checkedPath = await checkPath(directory, path);
  if(!checkedPath){
    return 'File not exist!'
  }
  const newPathArr = checkedPath.split('\\');
  let newPath = newPathArr.slice(0, newPathArr.length - 1)
  newPath.push(name);
  newPath = newPath.join('\\');
  const checkedNewPath = await checkPath(directory, newPath);
  if (checkedNewPath) {
    return 'File is exist'
  }
  return new Promise((resolve, reject) => {
            fs.rename(checkedPath, newPath, (err) => {
              if (err) {
                resolve('Operation failed');
              }
              resolve('File renamed')
            })
        })
}
