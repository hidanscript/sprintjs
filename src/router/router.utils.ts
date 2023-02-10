import { HTTP_METHOD } from "../utils/const";

/**
 * @class RouterUtils
 * @description Utility class for router.
 * @export
*/

export class RouterUtils {

  /**
   * Checks if the method is allowed from the HTTP_METHOD enum.
   * @param string method
   * @returns boolean
  */

  public static hasAnAllowedMethod(method: HTTP_METHOD) {
    return Object.values(HTTP_METHOD).includes(method);
  }

  /**
   * Gets route params from query string.
   * @param string query
   * @returns object
  */
  
  public static getParamsFromQuery(query: string) {
    const params = query.split('&');
    const paramsObj: any = {};
    
    params.forEach((param) => {
      const [key, value] = param.split('=');
      paramsObj[key] = value;
    });
  
    return paramsObj;
  }

  /**
   * Gets Id property from url.
   * @param string url
   * @returns string
  */

  public static getIdFromUrl(url: string) {
    const urlParts = url.split('/');
    const id = urlParts[urlParts.length - 1];
    return id;
  }

  /**
   * Checks if url has id property.
   * @param string url
   * @returns boolean
  */

  public static checkIfURLHasId(url: string) {
    const urlParts = url.split('/');
    const id = urlParts[urlParts.length - 1];
    return !isNaN(Number(id));
  }

  /**
   * Gets url keys from url.
   * @param string url
   * @returns string[]
  */

  public static getUrlKeys(url: string) {
    const urlParts = url.split('/');
    const keys = urlParts.filter((part) => part.startsWith(':'));
    return keys;
  }

  /**
    * Gets url subpath count.
    * @param string url
    * @returns number
  */
 
  public static getUrlSubpathCount(url: string) {
    const urlParts = url.split('/');
    return urlParts.length;
  }
}