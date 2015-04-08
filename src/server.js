/*eslint-env node*/
import {join} from "path";
import koa from "koa";
import koaMount from "koa-mount";

export default function createServer() {
  const app = koa();
  let todo;
  try {
    todo = require("./todo/server/");
  }
  catch (err) {
    console.warn("/todo/ -- Not Found.");
  }

  if (todo) {
    app.use(koaMount("/todo", todo()));
  }

  return app;
}

if (require.main === module) {
  createServer().listen(process.argv[2] || 3000);
}
