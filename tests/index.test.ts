import { Sprint } from '../src/index';
import request from "supertest";

const emptyCb = () => {};

describe("test server initialization", () => {
  it("should start a server on port 8080", () => {
    const sprint = Sprint;
    sprint.init(8080, emptyCb);
    const address: any = sprint.server.address();
    expect(address.port).toBeTruthy();
    expect(address.port).toBe(8080);
    sprint.shutdown();
  });

  it("should create and get a new route called users", async () => {
    const sprint = Sprint;
    sprint.router.get('/users', (req, res) => {
      res.statusCode = 200;
      res.write(JSON.stringify({ message: 'Hello World' }));
      res.end();
    });
    sprint.init(8080, emptyCb);

    expect(sprint.router).toBeDefined();
    const res = await request(sprint.server).get('/users');
    expect(res.text).toBe("{\"message\":\"Hello World\"}");
    sprint.shutdown();
  });

  it("should create and get a new route called users with a middleware", async () => {
    const sprint = Sprint;
    sprint.middlewares.use((req, res) => {
      req.body = { message: 'Hello World' };
    });
    sprint.router.get('/users', (req, res) => {
      res.statusCode = 200;
      res.write(JSON.stringify(req.body));
      res.end();
    });
    sprint.init(8080, emptyCb);

    expect(sprint.router).toBeDefined();
    const res = await request(sprint.server).get('/users');
    expect(res.text).toBe("{\"message\":\"Hello World\"}");
    sprint.shutdown();
  });
});