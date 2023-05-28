import chalk from "chalk";

export default class Log {
  static info = (...args) => {
    console.log(
      `[${new Date().toLocaleString()}]`,
      chalk.blue(`[INFO]`),
      chalk.blueBright(args)
    );
  };

  static success = (...args) => {
    console.log(
      `[${new Date().toLocaleString()}]`,
      chalk.green(`[SUCCESS]`),
      chalk.greenBright(args)
    );
  };

  static warn = (...args) => {
    console.log(
      `[${new Date().toLocaleString()}]`,
      chalk.yellow(`[WARN]`),
      chalk.yellowBright(args)
    );
  };

  static error = (...args) => {
    console.log(
      `[${new Date().toLocaleString()}]`,
      chalk.red(`[ERROR] `),
      chalk.redBright(args)
    );
  };
}
