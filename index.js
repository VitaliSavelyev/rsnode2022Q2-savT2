import { pipeline } from 'stream';
import { createStreams } from "./streams/createStreams.js";
import { errorTypes } from './constant/constants.js';
import checkUserName from './streams/checkUserName.js';
import os from "os";

async function app() {
  let processExit = 0;
  try {
    const streams = await createStreams();
    const getUserName = process.argv.slice(2);
    if (!getUserName.length) {
      throw new Error(`${errorTypes['NOTUSERNAME']}`);
    }
    const userName = checkUserName(getUserName[0]);
    streams.readable.on('data', (chunk) => {
      if(chunk.toString().trim() === 'exit' || processExit) {
        process.exit(0)
      }
    });
    streams.writable.write(`You are currently in ${os.homedir()}`)
    streams.writable.write(`\n`)
    process.on("exit", (code) => {
      if(code === 0) {
        console.log(`Thank you for using File Manager, ${userName}!`)
      }
    })
    process.on('SIGINT', () => {
      process.exit(0)
    });
    pipeline(
        streams.readable,
        streams.transform,
        streams.writable,
        (err) => {
          if (!err) {
            console.log(2, 'Pipeline succeeded.');
          } else {
            console.log(3, err)
          }
        }
    )
  }
  catch (e) {
    process.stderr.write(e.message);
    process.exit(1);
  }
}

app()
