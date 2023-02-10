
/**
 * Logger class
 * 
 * @class Logger
 * @export
*/

export class Logger {

  /**
   * Logs message to console.
   * @param {string} message
   * @returns {void}
   * @static
  */

  public static debug(message: string) {
    console.log(message);
  }

  /**
   * Logs info message to console.
   * 
   * @param {string} message
   * @returns {void}
   * @static
  */

  public static info(message: string) {
    console.info(message);
  }

  /**
   * Logs warning message to console.
   *  
   * @param {string} message
   * @returns {void}
   * @static
  */

  public static warn(message: string) {
    console.warn(message);
  }

  /**
   * Logs error message to console.
   *  
   * @param {string} message
   * @returns {void}
   * @static
  */

  public static error(message: string) {
    console.error(message);
  }
}