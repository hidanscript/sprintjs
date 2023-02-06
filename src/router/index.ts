import { IncomingMessage, ServerResponse } from 'http';
import { IRoute } from '../interfaces/routes.interface';
import { HTTP_METHOD, HTTP_STATUS_CODE } from '../utils/const';

const routes: IRoute[] = [];

function initRoutes(req: IncomingMessage, res: ServerResponse) {
  const { url, method } = req;

  const route = routes.find((routeObj) => {
    return routeObj.route === url && routeObj.method === method;
  });

  if (route) {
    execRoute(route, req, res);
  } else {
    res.statusCode = HTTP_STATUS_CODE.NOT_FOUND;
    res.end();
  }
}

function execRoute(route: IRoute, req: IncomingMessage, res: ServerResponse) {
  route.cb(req, res);
  res.statusCode = route.statusCode || 200;
  res.end();
}

function router(method: HTTP_METHOD, route: string, cb: (req: IncomingMessage, res: ServerResponse) => void) {
  if (hasAnAllowedMethod(method)) {
    routes.push({ method, route, cb });
  } else {
    throw new Error(`Method ${method} not allowed`);
  }
}

function hasAnAllowedMethod(method: HTTP_METHOD) {
  return Object.values(HTTP_METHOD).includes(method);
}

export { router, initRoutes };