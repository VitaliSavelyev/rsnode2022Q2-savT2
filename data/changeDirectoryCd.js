import checkPath from './checkPath.js'

export default async function changeDirectoryCd(directory, path) {
  if(path.length){
    const newDirectory = await checkPath(directory, path);
    return newDirectory || directory;
  }
}
