import { SprintRequest } from "../interfaces/request.interface";
import { ServerResponse } from "http";
import { Middleware } from "../interfaces/middleware.interface";

/**
 * Class that handles middlewares.
 * @class Middlewares
 * @export
*/

export class Middlewares {

  /**
   * Array of middlewares.
   * @private
   * @type {Middleware[]}
  */

  private middlewares: Middleware[] = [];

  /**
   * Adds middleware to middlewares array.
   * @param function middleware
  */

  public use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }

  /**
   * Executes all middlewares.
   * @param req
   * @param res
  */

  public exec(req: SprintRequest, res: ServerResponse) {
    this.middlewares.forEach((middleware) => {
      middleware(req, res);
    });
  }
}