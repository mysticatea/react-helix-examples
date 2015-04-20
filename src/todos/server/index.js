import {join} from "path";
import koa from "koa";
import koaStatic from "koa-static";

export default function createServer() {
  const app = koa();
  app.use(koaStatic(join(__dirname, "../client/")));
  return app;
}

if (require.main === module) {
  createServer().listen(process.argv[2] || 3000);
}
