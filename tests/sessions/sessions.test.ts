import { Sprint } from "../../src";
import request from "supertest";

describe("test sessions", () => {
  it("should create a new session", async () => {
    let sessionId = "";
    const sprint = Sprint;
    sprint.use((req, res) => {
      sprint.sessions.initSession(req, res);
    });
    sprint.router.get('/', (req, res) => {
      res.statusCode = 200;
      sessionId = req.session.id;
      res.write(JSON.stringify({ session: { id: req.session.id }}));
      res.end();
    });
    sprint.init(8081, () => {});
    const res = await request(sprint.server).get('/');
    expect(res.text).toBe("{\"session\":{\"id\":\"" + sessionId + "\"}}");
    sprint.server.close();
  });

  it("should get the same session", async () => {
    const sprint = Sprint;
    sprint.use((req, res) => {
      sprint.sessions.initSession(req, res);
    });
    sprint.router.get('/', (req, res) => {
      res.statusCode = 200;
      res.write(JSON.stringify({ session: { id: req.session.id }}));
      res.end();
    });
    
    sprint.router.get('/test', (req, res) => {
      res.statusCode = 200;
      res.write(JSON.stringify({ session: { id: req.session.id }}));
      res.end();
    });
    sprint.init(8081, () => {});

    const res = await request(sprint.server).get('/');
    const resParsed = JSON.parse(res.text);
    const sessionId = resParsed.session.id;
    expect(sessionId).toBeTruthy();

    const res2 = await request(sprint.server).get('/test');
    const resParsed2 = JSON.parse(res2.text);
    const sessionId2 = resParsed2.session.id;
    
    expect(sessionId2).toBe(sessionId);
    sprint.server.close();
  });
});