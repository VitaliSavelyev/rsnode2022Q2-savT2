import { createTransformStream } from './createTransformStream.js';


async function createStreams() {
  const readable = process.stdin;
  const writable = process.stdout
  const transform = await createTransformStream();
  return { readable, writable, transform }
}


export { createStreams }
