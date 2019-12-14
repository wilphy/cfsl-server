const { HttpException } = require("../core/http-exception");

const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // 开发环境
    const isHttpException = error instanceof HttpException;
    const isDev = global.config.environment === "dev";

    if (isDev && !isHttpException) {
      throw error;
    }

    if (error instanceof HttpException) {
      //已知错误
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        requset: `${ctx.method} ${ctx.path}`
      };
      ctx.status = error.code;
    } else {
      //未知错误
      ctx.body = {
        msg: "we made a mistake 0(n_n)0",
        error_code: 999,
        requset: `${ctx.method} ${ctx.path}`
      };
      ctx.status = 500;
    }
  }
};

module.exports = catchError;
