import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { SprintRequest } from './interfaces/request.interface';
import { Logger } from './logger';
import { Router } from './router';
import { Middlewares } from './middlewares';
import { EmptyCallback } from './interfaces/utils.interface';
import { Sessions } from './sessions';

export class Sprint {
  public static logger: Logger = new Logger();
  public static middlewares: Middlewares = new Middlewares();
  public static router: Router = new Router(this.middlewares);
  public static sessions: Sessions = new Sessions();
  public static server: Server;

  /**
   * Initializes the server on the specified port and calls the callback.
   * @param port
   * @param cb
  */

  public static init(port: number, cb: EmptyCallback) {
    this.server = createServer((req: IncomingMessage, res: ServerResponse) => {
      const newReq: SprintRequest = <SprintRequest> req;
      this.router.initRoutes(newReq, res);
    });

    this.server.listen(port, cb);
  }

  /**
   * Shuts down the server.
   * @param cb
  */

  public static shutdown(cb: EmptyCallback = () => {}) {
    this.server.close(cb);
  }

  /**
   * Returns the config object.
  */

  public static config() {
    return {
      logger: this.logger,
      router: this.router,
      middlewares: this.middlewares,
      sessions: this.sessions,
    };
  }
}
