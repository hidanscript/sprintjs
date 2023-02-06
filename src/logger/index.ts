export class Logger {
  public static debug(message: string) {
    console.log(message);
  }

  public static info(message: string) {
    console.info(message);
  }

  public static warn(message: string) {
    console.warn(message);
  }

  public static error(message: string) {
    console.error(message);
  }
}