import { createTransformStream } from './createTransformStream.js';
import * as fs from 'fs';


async function createStreams() {
  const readable = process.stdin;
  const writable = process.stdout
  const transform = await createTransformStream();
  return { readable, writable, transform }
}


export { createStreams }
