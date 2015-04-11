import {join} from "path";
import koa from "koa";
import koaStatic from "koa-static";

export default function createServer() {
  const app = koa();
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
  app.use(koaStatic(join(__dirname, "../client/")));
  return app;
}

if (require.main === module) {
  createServer().listen(process.argv[2] || 3000);
}
