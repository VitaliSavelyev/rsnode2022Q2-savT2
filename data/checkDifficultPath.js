export default function checkDifficultPath (command) {
  let path = [];
  const mass = command.slice(1, command.length);
  if (mass.length === 2) {
    return mass;
  }
  mass.map(elem => {
    console.log(elem)
    if (!path.length) {
      path.push(elem)
    } else {
      if (elem.indexOf('.') > -1) {
        path[0] += ' ' + elem;
        path[1] = '';
      } else {
        if (path.length === 1) {
          path[0] += ' ' + elem;
        } else {
          path[1] += ' ' + elem;
        }
      }
    }
  })
  path = path.map(elem => elem.trim())
  return path;
}
