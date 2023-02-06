"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const const_1 = require("./utils/const");
const router_1 = require("./router");
const posts_json_1 = __importDefault(require("./data/posts.json"));
const sprint = {
    init,
    router: router_1.router,
};
function init(port) {
    const server = (0, http_1.createServer)((req, res) => {
        (0, router_1.initRoutes)(req, res);
    });
    server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    });
}
sprint.router(const_1.HTTP_METHOD.GET, '/posts', (req, res) => {
    console.log('GET /posts');
    res.write(JSON.stringify(posts_json_1.default));
});
sprint.router(const_1.HTTP_METHOD.GET, '/pages', (req, res) => {
    console.log('GET /pages');
});
sprint.init(3000);
exports.default = sprint;
