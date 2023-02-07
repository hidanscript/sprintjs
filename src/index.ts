import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { SprintRequest } from './interfaces/request.interface';
import { Logger } from './logger';
import { Router } from './router';
import { Middlewares } from './middlewares';
import { Middleware } from './interfaces/middleware.interface';
import { EmptyCallback } from './interfaces/utils.interface';

export class Sprint {
  public static logger: Logger = new Logger();
  public static router: Router = new Router();
  public static server: Server;

  public static init(port: number, cb: EmptyCallback) {
    this.server = createServer((req: IncomingMessage, res: ServerResponse) => {
      const newReq: SprintRequest = <SprintRequest> req;
      this.router.initRoutes(newReq, res);
    });

    this.server.listen(port, cb);
  }

  public static use(middleware: Middleware) {
    Middlewares.use(middleware);
  }
}
