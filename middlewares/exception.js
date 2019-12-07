const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.body = "服务器出错";
  }
};

module.exports = catchError;
