const { LinValidator, Rule } = require("../../core/lin-validator");

const { User } = require("../models/user");
const { LoginType } = require("../lib/enum");

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super();
    this.id = [new Rule("isInt", "需要是正整数", { min: 1 })];
  }
}

class RegisterIntegerValidator extends LinValidator {
  constructor() {
    super();
    this.email = [new Rule("isEmail", "不符合Email规范")];
    this.password1 = [
      // 用户指定范围 123456 $^
      new Rule("isLength", "密码至少6个字符，最多32个字符", {
        min: 6,
        max: 32
      }),
      new Rule(
        "matches",
        "密码不符合规范",
        "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]"
      )
    ];
    this.password2 = this.password1;
    this.nickname = [
      new Rule("isLength", "昵称不符合长度规范", {
        min: 4,
        max: 32
      })
    ];
  }

  validatePassword(vals) {
    const psw1 = vals.body.password1;
    const psw2 = vals.body.password2;
    if (psw1 !== psw2) {
      throw new Error("两个密码必须相同");
    }
  }
}

class TokenValidator extends LinValidator {
  constructor() {
    super();
    this.account = [
      new Rule("isLength", "不符合账号规则", {
        min: 4,
        max: 32
      })
    ];
    this.secret = [
      //下面这句加了就报未知错误
      // new Rule("isOptional"), //isOptional可传值或不传
      new Rule("isLength", "至少6个字符", {
        min: 6,
        max: 128
      })
    ];
  }

  validateLoginType(vals) {
    if (!vals.body.type) {
      throw new Error("type是必须参数");
    }
    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error("type参数不合法");
    }
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterIntegerValidator,
  TokenValidator
};
