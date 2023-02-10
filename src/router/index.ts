import { ServerResponse } from 'http';
import { Route, RouteCallback } from '../interfaces/routes.interface';
import { HTTP_METHOD, HTTP_STATUS_CODE } from '../utils/const';
import { SprintRequest } from '../interfaces/request.interface';
import { RouterUtils } from '../router/router.utils';
import { Logger } from '../logger';
import { Middlewares } from '../middlewares';
import url from 'url';
import querystring from 'querystring';

export class Router {

  private routes: Route[] = [];

  constructor (private middlewares: Middlewares) {}

  /**
     * Register action for HTTP GET method.
     *
     * @param string route
     * @param function cb
  */

  public get(route: string, cb: RouteCallback) {
    this.addRoute(HTTP_METHOD.GET, route, cb);
  }

  /**
     * Register action for HTTP POST method.
     *
     * @param string route
     * @param function cb
  */

  public post(route: string, cb: RouteCallback) {
    this.addRoute(HTTP_METHOD.POST, route, cb);
  }

  /**
     * Register action for HTTP PUT method.
     *
     * @param string route
     * @param function cb
  */

  public put(route: string, cb: RouteCallback) {
    this.addRoute(HTTP_METHOD.PUT, route, cb);
  }

  /**
     * Register action for HTTP DELETE method.
     *
     * @param string route
     * @param function cb
  */

  public delete(route: string, cb: RouteCallback) {
    this.addRoute(HTTP_METHOD.DELETE, route, cb);
  }

  /**
     * Adds route object to routes array.
     *
     * @param string method
     * @param string pat
     * @param function cb
  */

  private addRoute(method: HTTP_METHOD, path: string, cb: RouteCallback) {
    if (RouterUtils.hasAnAllowedMethod(method)) {
      this.routes.push({ method, path, cb });
    } else {
      Logger.error(`Method ${method} not allowed`);
      throw new Error(`Method ${method} not allowed`);
    }
  }

  /**
     * Initializes routes, its middlewares and executes the route callback.
     *
     * @param SprintRequest req
     * @param ServerResponse res
  */

  public initRoutes(req: SprintRequest, res: ServerResponse) {
    const { url: reqUrl, method } = req;

    if (!reqUrl || !method) {
      res.statusCode = HTTP_STATUS_CODE.BAD_REQUEST;
      res.write(`${HTTP_STATUS_CODE.BAD_REQUEST} - Bad Request`);
      res.end();
      return;
    }

    const parsedUrl = url.parse(reqUrl || '');
    const query = querystring.parse(parsedUrl.query || '');

    req.query = query;
    req.params = RouterUtils.getParamsFromQuery(parsedUrl.query || '');

    const route = this.getRouteFromPathAndMethod(reqUrl, method);

    if (route) {
      this.execMiddlewares(req, res);
      this.execRoute(route, req, res);
    } else {
      res.statusCode = HTTP_STATUS_CODE.NOT_FOUND;
      res.write(`${HTTP_STATUS_CODE.NOT_FOUND} - Not Found`);
      res.end();
    }
  }

  /**
     * Returns route object from routes array.
     *
     * @param string path
     * @param string method
  */

  private getRouteFromPathAndMethod(path: string, method: string) {
    return this.routes.find((route) => {
      return route.path === path && route.method === method;
    });
  }

  /**
     * Executes route callback and ends response.
     *
     * @param string route
     * @param function cb
  */

  private execRoute(route: Route, req: SprintRequest, res: ServerResponse) {
    route.cb(req, res);
    res.statusCode = route.statusCode || 200;
    res.end();
  }

  /**
   * Executes middlewares.
   * @param SprintRequest req
   * @param ServerResponse res
  */

  private execMiddlewares(req: SprintRequest, res: ServerResponse) {
    this.middlewares.exec(req, res);
  }
}
