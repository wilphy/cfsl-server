const Router = require("koa-router");
const requireDirectory = require("require-directory");

class InitManager {
  static initCore(app) {
    //入口方法
    InitManager.app = app;
    InitManager.initLoadRouters();
    InitManager.loadHttpException();
    InitManager.loadConfig();
  }

  static loadConfig(path = "") {
    const configPath = path || process.cwd() + "/config/config.js";
    const config = require(configPath);
    global.config = config;
  }

  //初始化管理器
  static initLoadRouters() {
    //path 配置
    const apiDirectory = `${process.cwd()}/app/api`;
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModules
    });

    function whenLoadModules(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }
  }

  static loadHttpException() {
    const errors = require("./http-exception");
    global.errs = errors;
  }
}

module.exports = InitManager;
