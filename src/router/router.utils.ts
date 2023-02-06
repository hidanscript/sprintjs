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
}