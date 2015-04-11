"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createServer;

var _join = require("path");

var _koa = require("koa");

var _koa2 = _interopRequireWildcard(_koa);

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireWildcard(_koaStatic);

function createServer() {
  var app = _koa2["default"]();
  app.use(function* (next) {
    // those status path return index.html.
    switch (this.path) {
      case "/active":
      case "/completed":
      case "/all":
        this.path = "/index.html";
        break;
    }

    yield next;
  });
  app.use(_koaStatic2["default"](_join.join(__dirname, "../client/")));
  return app;
}

if (require.main === module) {
  createServer().listen(process.argv[2] || 3000);
}
module.exports = exports["default"];