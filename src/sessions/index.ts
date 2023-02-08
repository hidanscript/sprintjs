import { ServerResponse } from "http";
import { SprintRequest } from "../interfaces/request.interface";

export class Sessions {
  public sessions: any = [];

  public createSession() {
    const sessionId = this.generateSessionId();
    const session = {
      id: sessionId,
      expires: new Date().getTime() + 1000 * 60 * 60 * 24, // 24 hours
    };
    this.sessions.push(session);
    return sessionId;
  }

  public getSession(sessionId: string) {
    return this.sessions.find((session: any) => session.id === sessionId);
  }

  public deleteSession(sessionId: string) {
    this.sessions = this.sessions.filter((session: any) => session.id !== sessionId);
  }

  public generateSessionId() {
    const sessionId = Math.random().toString(36).substr(2, 9);
    return sessionId;
  }

  public addDataToSession(sessionId: string, data: any) {
    const session = this.getSession(sessionId);
    session.data = data;
  }

  public getDataFromSession(sessionId: string) {
    const session = this.getSession(sessionId);
    return session.data;
  }

  public deleteDataFromSession(sessionId: string) {
    const session = this.getSession(sessionId);
    delete session.data;
  }

  public addCookieToSession(sessionId: string, cookie: any) {
    const session = this.getSession(sessionId);
    session.cookie = cookie;
  }

  public getCookieFromSession(sessionId: string) {
    const session = this.getSession(sessionId);
    return session.cookie;
  }

  public deleteCookieFromSession(sessionId: string) {
    const session = this.getSession(sessionId);
    delete session.cookie;
  }

  public generateCookie() {
    const cookie = Math.random().toString(36).substr(2, 9);
    return cookie;
  }

  public addCookieToResponse(res: any, cookie: any) {
    res.setHeader('Set-Cookie', cookie);
  }

  public getCookieFromRequest(req: any) {
    const cookie = req.headers.cookie;
    return cookie;
  }

  public deleteCookieFromResponse(res: any) {
    res.writeHead(200, { 'Set-Cookie': '' });
  }

  public checkIfSessionExists(sessionId: string) {
    const session = this.getSession(sessionId);
    return !!session;
  }

  public checkIfCookieExists(cookie: any) {
    const session = this.sessions.find((session: any) => session.cookie === cookie);
    return !!session;
  }

  public sessionHasExpired(sessionId: string) {
    const session = this.getSession(sessionId);
    const currentTime = new Date().getTime();
    return session.expires < currentTime;
  }

  public deleteExpiredSessions() {
    this.sessions = this.sessions.filter((session: any) => !this.sessionHasExpired(session.id));
  }

  public initSession(req: SprintRequest, res: ServerResponse) {
    const cookie = this.getCookieFromRequest(req);
    if (cookie) {
      const session = this.sessions.find((session: any) => session.cookie === cookie);
      if (session) {
        req.session = session;
      } else {
        const sessionId = this.createSession();
        this.addCookieToSession(sessionId, cookie);
        const newSession = this.getSession(sessionId);
        req.session = newSession;
      }
    } else {
      const sessionId = this.createSession();
      const newCookie = this.generateCookie();
      this.addCookieToSession(sessionId, newCookie);
      this.addCookieToResponse(res, newCookie);
      const newSession = this.getSession(sessionId);
      req.session = newSession;
    }
  }
}