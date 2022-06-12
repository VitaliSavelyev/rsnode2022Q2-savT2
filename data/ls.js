import { errorTypes } from '../constant/constants.js';
import * as fs from 'fs'

export default async function ls (path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if(err) {
        return reject(`${errorTypes['INVALID_INPUT']}`)
      }
      resolve(files)
    })
  })
}
