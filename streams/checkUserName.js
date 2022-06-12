import {errorTypes} from '../constant/constants.js'

export default function checkUserName (userName) {
  const name = userName.split('--username=');
  if(name.length !== 2){
    throw new Error(`${errorTypes['NOTCORRECTUSERNAME']}`);
  }
  console.log(`Welcome to the File Manager, ${name[1]}!`);
  return name[1];
}
