import { ServerResponse } from 'http';
import { Route, RouteCallback } from '../interfaces/routes.interface';
import { HTTP_METHOD, HTTP_STATUS_CODE } from '../utils/const';
import { SprintRequest } from '../interfaces/request.interface';
import { RouterUtils } from '../router/router.utils';
import { Logger } from '../logger';
import { Middlewares } from '../middlewares';
import url from 'url';
import querystring from 'querystring';

const routes: Route[] = [];

export class Router {
  public get(route: string, cb: RouteCallback) {
    this.addRoute(HTTP_METHOD.GET, route, cb);
  }

  public post(route: string, cb: RouteCallback) {
    this.addRoute(HTTP_METHOD.POST, route, cb);
  }

  public put(route: string, cb: RouteCallback) {
    this.addRoute(HTTP_METHOD.PUT, route, cb);
  }

  public delete(route: string, cb: RouteCallback) {
    this.addRoute(HTTP_METHOD.DELETE, route, cb);
  }

  private addRoute(method: HTTP_METHOD, path: string, cb: RouteCallback) {
    if (RouterUtils.hasAnAllowedMethod(method)) {
      routes.push({ method, path, cb });
    } else {
      Logger.error(`Method ${method} not allowed`);
      throw new Error(`Method ${method} not allowed`);
    }
  }

  // This is the method that is called from the server.ts file
  // It is called for every request

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
      Middlewares.exec(req, res);
      this.execRoute(route, req, res);
    } else {
      res.statusCode = HTTP_STATUS_CODE.NOT_FOUND;
      res.write(`${HTTP_STATUS_CODE.NOT_FOUND} - Not Found`);
      res.end();
    }
  }

  private getRouteFromPathAndMethod(path: string, method: string) {
    return routes.find((route) => {
      return route.path === path && route.method === method;
    });
  }

  private execRoute(route: Route, req: SprintRequest, res: ServerResponse) {
    route.cb(req, res);
    res.statusCode = route.statusCode || 200;
    res.end();
  }
}
