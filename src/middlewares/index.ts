import { SprintRequest } from "../interfaces/request.interface";
import { ServerResponse } from "http";
import { Middleware } from "../interfaces/middleware.interface";

const middlewares: Middleware[] = [];

export class Middlewares {
  public static use(middleware: Middleware) {
    middlewares.push(middleware);
  }

  public static execMiddlewares(req: SprintRequest, res: ServerResponse) {
    middlewares.forEach((middleware) => {
      middleware(req, res);
    });
  }
}