import { ServerResponse } from 'http';
import { IRoute, RouteCallback } from '../interfaces/routes.interface';
import { HTTP_METHOD, HTTP_STATUS_CODE } from '../utils/const';
import { SprintRequest } from '../interfaces/request.interface';
import { RouterUtils } from '../router/router.utils';
import { Logger } from '../logger';
import { Middlewares } from '../middlewares';
import url from 'url';
import querystring from 'querystring';

const routes: IRoute[] = [];

export class Router {
  public static get(route: string, cb: RouteCallback) {
    Router.addRoute(HTTP_METHOD.GET, route, cb);
  }

  public static post(route: string, cb: RouteCallback) {
    Router.addRoute(HTTP_METHOD.POST, route, cb);
  }

  public static put(route: string, cb: RouteCallback) {
    Router.addRoute(HTTP_METHOD.PUT, route, cb);
  }

  public static delete(route: string, cb: RouteCallback) {
    Router.addRoute(HTTP_METHOD.DELETE, route, cb);
  }

  private static addRoute(method: HTTP_METHOD, route: string, cb: RouteCallback) {
    if (RouterUtils.hasAnAllowedMethod(method)) {
      routes.push({ method, route, cb });
    } else {
      Logger.error(`Method ${method} not allowed`);
      throw new Error(`Method ${method} not allowed`);
    }
  }

  public static initRoutes(req: SprintRequest, res: ServerResponse) {
    const { url: reqUrl, method } = req;

    const parsedUrl = url.parse(reqUrl || '');
    const query = querystring.parse(parsedUrl.query || '');

    req.query = query;
    req.params = RouterUtils.getParamsFromQuery(parsedUrl.query || '');

    const route = routes.find((routeObj) => {
      return routeObj.route === reqUrl && routeObj.method === method;
    });

    if (route) {
      Middlewares.execMiddlewares(req, res);
      Router.execRoute(route, req, res);
    } else {
      res.statusCode = HTTP_STATUS_CODE.NOT_FOUND;
      res.end();
    }
  }

  private static execRoute(route: IRoute, req: SprintRequest, res: ServerResponse) {
    route.cb(req, res);
    res.statusCode = route.statusCode || 200;
    res.end();
  }
}
