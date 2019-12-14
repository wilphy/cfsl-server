const Router = require("koa-router");
const router = new Router({
  prefix: "/v1/user"
});
const { RegisterIntegerValidator } = require("../../validators/validator");
const { User } = require("../../models/user");

//注册
router.post("/register", async ctx => {
  const v = new RegisterIntegerValidator().validate(ctx);
  const user = {
    email: v.get("body.email"),
    password: v.get("body.password2"),
    nickname: v.get("body.nickname")
  };

  User.create(user);
});

module.exports = router;
