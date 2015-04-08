"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createServer;
/*eslint-env node*/

var _join = require("path");

var _koa = require("koa");

var _koa2 = _interopRequireWildcard(_koa);

var _koaMount = require("koa-mount");

var _koaMount2 = _interopRequireWildcard(_koaMount);

function createServer() {
  var app = _koa2["default"]();
  var todo = undefined;
  try {
    todo = require("./todo/server/");
  } catch (err) {
    console.warn("/todo/ -- Not Found.");
  }

  if (todo) {
    app.use(_koaMount2["default"]("/todo", todo()));
  }

  return app;
}

if (require.main === module) {
  createServer().listen(process.argv[2] || 3000);
}
module.exports = exports["default"];
