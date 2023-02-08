"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
const supertest_1 = __importDefault(require("supertest"));
describe("test sessions", () => {
    it("should create a new session", () => __awaiter(void 0, void 0, void 0, function* () {
        let sessionId = "";
        const sprint = src_1.Sprint;
        sprint.middlewares.use((req, res) => {
            sprint.sessions.initSession(req, res);
        });
        sprint.router.get('/', (req, res) => {
            res.statusCode = 200;
            sessionId = req.session.id;
            res.write(JSON.stringify({ session: { id: req.session.id } }));
            res.end();
        });
        sprint.init(8081, () => { });
        const res = yield (0, supertest_1.default)(sprint.server).get('/');
        expect(res.text).toBe("{\"session\":{\"id\":\"" + sessionId + "\"}}");
        sprint.shutdown();
    }));
    it("should get the same session", () => __awaiter(void 0, void 0, void 0, function* () {
        const sprint = src_1.Sprint;
        sprint.middlewares.use((req, res) => {
            sprint.sessions.initSession(req, res);
        });
        sprint.router.get('/', (req, res) => {
            res.statusCode = 200;
            res.write(JSON.stringify({ session: { id: req.session.id } }));
            res.end();
        });
        sprint.router.get('/test', (req, res) => {
            res.statusCode = 200;
            res.write(JSON.stringify({ session: { id: req.session.id } }));
            res.end();
        });
        sprint.init(8081, () => { });
        const res = yield (0, supertest_1.default)(sprint.server).get('/');
        const resParsed = JSON.parse(res.text);
        const sessionId = resParsed.session.id;
        expect(sessionId).toBeTruthy();
        const res2 = yield (0, supertest_1.default)(sprint.server).get('/test');
        const resParsed2 = JSON.parse(res2.text);
        const sessionId2 = resParsed2.session.id;
        expect(sessionId2).toBe(sessionId);
        sprint.shutdown();
    }));
});
