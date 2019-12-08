const Router = require("koa-router");
const router = new Router();

router.post("/v1/:id/classic/latest", (ctx, next) => {
  const path = ctx.params;
  const query = ctx.request.query;
  const headers = ctx.request.header;
  const body = ctx.request.body;
  // if (!query) {
  if (true) {
    const error = new global.errs.ParameterException();
    // error.requestUrl = `${ctx.method} ${ctx.path}`;
    throw error;
  }
});

module.exports = router;
