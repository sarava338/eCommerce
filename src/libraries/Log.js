import chalk from "chalk";

export default class Log {
  static info = (...args) => {
    console.log(
      `[${new Date().toLocaleString()}]`,
      chalk.blue(`[INFO]`),
      ...args
    );
  };

  static success = (...args) => {
    console.log(
      `[${new Date().toLocaleString()}]`,
      chalk.green(`[SUCCESS]`),
      ...args
    );
  };

  static warn = (...args) => {
    console.log(
      `[${new Date().toLocaleString()}]`,
      chalk.yellow(`[WARN]`),
      ...args
    );
  };

  static error = (...args) => {
    console.log(
      `[${new Date().toLocaleString()}]`,
      chalk.red(`[ERROR] `),
      ...args
    );
  };
}
