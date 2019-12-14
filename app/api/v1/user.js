const Router = require("koa-router");
const router = new Router({
  prefix: "/v1/user"
});
const { RegisterIntegerValidator } = require("../../validators/validator");

//注册
router.post("/register", async ctx => {
  const v = new RegisterIntegerValidator().validate(ctx);
});

module.exports = router;
