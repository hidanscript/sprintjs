"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRoutes = exports.router = void 0;
const const_1 = require("../utils/const");
const routes = [];
function initRoutes(req, res) {
    const { url, method } = req;
    const route = routes.find((routeObj) => {
        return routeObj.route === url && routeObj.method === method;
    });
    if (route) {
        execRoute(route, req, res);
    }
    else {
        res.statusCode = const_1.HTTP_STATUS_CODE.NOT_FOUND;
        res.end();
    }
}
exports.initRoutes = initRoutes;
function execRoute(route, req, res) {
    route.cb(req, res);
    res.statusCode = route.statusCode || 200;
    res.end();
}
function router(method, route, cb) {
    if (hasAnAllowedMethod(method)) {
        routes.push({ method, route, cb });
    }
    else {
        throw new Error(`Method ${method} not allowed`);
    }
}
exports.router = router;
function hasAnAllowedMethod(method) {
    return Object.values(const_1.HTTP_METHOD).includes(method);
}
