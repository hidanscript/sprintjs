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
   * @param {Middleware} middleware
   * @returns {void}
  */

  public use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }

  /**
   * Executes all middlewares.
   * @param {SprintRequest} req
   * @param {ServerResponse} res
   * @returns {void}
  */

  public exec(req: SprintRequest, res: ServerResponse) {
    this.middlewares.forEach((middleware) => {
      middleware(req, res);
    });
  }
}