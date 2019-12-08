const Router = require("koa-router");
const router = new Router();

const { PositiveIntegerValidator } = require("../../validators/validator");

router.post("/v1/:id/classic/latest", (ctx, next) => {
  const path = ctx.params;
  const query = ctx.request.query;
  const headers = ctx.request.header;
  const body = ctx.request.body;

  const v = new PositiveIntegerValidator().validate(ctx);
  const id = v.get("path.id");

  ctx.body = "succeed";
});

module.exports = router;
