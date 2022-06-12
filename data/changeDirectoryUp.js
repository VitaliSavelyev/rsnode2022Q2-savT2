export default async function changeDirectoryUp(directory) {
    const newPath = directory.split('\\').slice(0, -1);
    let newDirectory = newPath.reduce((prev, cur) => cur && prev ? prev + '\\' + cur : prev  + cur, '');
    if (newPath.length > 1) {
      return newDirectory;
    } else if (newPath.length) {
      return newDirectory + '\\';
    } else {
      return directory;
    }
}
