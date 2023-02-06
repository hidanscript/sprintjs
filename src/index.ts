import { createServer, IncomingMessage, ServerResponse } from 'http';
import { SprintRequest } from './interfaces/request.interface';
import { Logger } from './logger';
import { Router } from './router';
import { Middlewares } from './middlewares';
import { Middleware } from './interfaces/middleware.interface';

export class Sprint {
  public static router: Router;
  public static logger: Logger;

  public static init(port: number) {
    const server = createServer((req: IncomingMessage, res: ServerResponse) => {
      const newReq: SprintRequest = <SprintRequest> req;
      Router.initRoutes(newReq, res);
    });

    server.listen(port, () => {
      Logger.info(`Server running at http://localhost:${port}/`);
    });
  }

  public static use(middleware: Middleware) {
    Middlewares.use(middleware);
  }
}
