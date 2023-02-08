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
const index_1 = require("../src/index");
const supertest_1 = __importDefault(require("supertest"));
const emptyCb = () => { };
describe("test server initialization", () => {
    it("should start a server on port 8080", () => {
        const sprint = index_1.Sprint;
        sprint.init(8080, emptyCb);
        const address = sprint.server.address();
        expect(address.port).toBeTruthy();
        expect(address.port).toBe(8080);
        sprint.shutdown();
    });
    it("should create and get a new route called users", () => __awaiter(void 0, void 0, void 0, function* () {
        const sprint = index_1.Sprint;
        sprint.router.get('/users', (req, res) => {
            res.statusCode = 200;
            res.write(JSON.stringify({ message: 'Hello World' }));
            res.end();
        });
        sprint.init(8080, emptyCb);
        expect(sprint.router).toBeDefined();
        const res = yield (0, supertest_1.default)(sprint.server).get('/users');
        expect(res.text).toBe("{\"message\":\"Hello World\"}");
        sprint.shutdown();
    }));
    it("should create and get a new route called users with a middleware", () => __awaiter(void 0, void 0, void 0, function* () {
        const sprint = index_1.Sprint;
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
        const res = yield (0, supertest_1.default)(sprint.server).get('/users');
        expect(res.text).toBe("{\"message\":\"Hello World\"}");
        sprint.shutdown();
    }));
});
