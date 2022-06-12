import * as fs from 'fs';

export default async function add (directory, name) {
  const checkName = name.split('\\').length > 1 && name.split('/').length > 1;
  if(checkName){
    return 'Not correct name!'
  }
  return new Promise((resolve, reject) => {
    const writable = fs.createWriteStream(directory + '\\' + name);
    writable.end(() => {
      resolve('File created!')
    });
  })
}
