const Koa = require("koa");
const InitManager = require("./core/init");

const app = new Koa();
process.cwd();

InitManager.initCore(app);

app.listen(3000);
