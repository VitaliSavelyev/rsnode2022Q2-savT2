import * as fs from 'fs';
import * as path from 'path';

export default function checkPath (directory, checkPath){
  console.log(1, checkPath)
  const checkRelativePath = checkPath.split('\\').length > 1;
  const newDirectory = checkRelativePath ? checkPath : path.join(directory, checkPath.trim());
  console.log(2, newDirectory)
  return new Promise((resolve) => {
    fs.access(newDirectory, fs.constants.F_OK, (error) => {
      if (!error) {
        resolve(newDirectory);
      } else {
        resolve(null);
      }
    });
  });
}
