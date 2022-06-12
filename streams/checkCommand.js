import { command } from '../constant/constants.js'

export default function checkCommand (getCommand) {
  return command.some(elem => elem === getCommand);
}
