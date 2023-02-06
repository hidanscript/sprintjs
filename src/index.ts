import { createServer, IncomingMessage, ServerResponse } from 'http';
import { HTTP_METHOD } from './utils/const';
import { initRoutes, router } from './router';
import posts from './data/posts.json';

const sprint = {
  init,
  router: router,
}

function init(port: number) {
  const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    initRoutes(req, res);
  });

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
}

sprint.init(3000);

export default sprint;