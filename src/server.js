/*eslint-env node*/
import {join} from "path";
import koa from "koa";
import koaMount from "koa-mount";

export default function createServer() {
  const app = koa();
  let todo;
  try {
    todo = require("./todos/server/");
  }
  catch (err) {
    console.warn("/todos/ -- Not Found.");
  }

  if (todo) {
    app.use(koaMount("/todos", todo()));
  }

  return app;
}

if (require.main === module) {
  createServer().listen(process.argv[2] || 3000);
  console.log("Started http://localhost:3000/todos/");
}
