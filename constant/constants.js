const errorTypes = {
  NOTUSERNAME: 'We dont now you! Reload program with your name.',
  NOTCORRECTUSERNAME: 'Your user name doesnt correct!',
  INVALID_INPUT: 'Invalid input',
  INVALID_PATH: 'Invalid path',
  INVALID_CATALOG: 'Invalid catalog',
  NOT_CHANGED_DIR: 'Directory was not changed!',
  NOT_FILE: 'This file is not available!'

};

const command = ['up', 'cd', 'ls', 'cat', 'add', 'rn', 'cp', 'mv', 'rm', 'os', 'hash', 'compress', 'decompress']

export { errorTypes, command };
