import { createServer, IncomingMessage, ServerResponse } from 'http';
import { SprintRequest } from './interfaces/request.interface';
import { Logger } from './logger';
import { Router } from './router';

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
}

Router.get('/posts', (req: SprintRequest, res: ServerResponse) => {
  res.write('Hello World!');
});

Sprint.init(3000);
