import { HTTP_METHOD } from "../utils/const";

export class RouterUtils {
  public static hasAnAllowedMethod(method: HTTP_METHOD) {
    return Object.values(HTTP_METHOD).includes(method);
  }
  
  public static getParamsFromQuery(query: string) {
    const params = query.split('&');
    const paramsObj: any = {};
    
    params.forEach((param) => {
      const [key, value] = param.split('=');
      paramsObj[key] = value;
    });
  
    return paramsObj;
  }

  public static getIdFromUrl(url: string) {
    const urlParts = url.split('/');
    const id = urlParts[urlParts.length - 1];
    return id;
  }

  public static checkIfURLHasId(url: string) {
    const urlParts = url.split('/');
    const id = urlParts[urlParts.length - 1];
    return !isNaN(Number(id));
  }

  public static getUrlKeys(url: string) {
    const urlParts = url.split('/');
    const keys = urlParts.filter((part) => part.startsWith(':'));
    return keys;
  }

  public static getUrlSubpathCount(url: string) {
    const urlParts = url.split('/');
    return urlParts.length;
  }
}