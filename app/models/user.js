const bcrypt = require("bcryptjs");

const { sequelize } = require("../../core/db");

const { Sequelize, Model } = require("sequelize");

class User extends Model {}

User.init(
  {
    //主键  不能重复，不能为空
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true //自增
    },
    nickname: Sequelize.STRING,
    email: {
      type: Sequelize.STRING(128),
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      set(val) {
        //加密   观察者模式
        const salt = bcrypt.genSaltSync(10);
        const pwd = bcrypt.hashSync(val, salt);
        this.setDataValue("password", pwd);
      }
    },
    openid: {
      type: Sequelize.STRING(64),
      unique: true
    }
  },
  { sequelize, tableName: "user" }
);

module.exports = {
  User
};
