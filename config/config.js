module.exports = {
  enviroment: "dev",
  database: {
    dbName: "cfsl",
    host: "localhost",
    port: 3306,
    user: "root",
    password: ""
  },
  security: {
    secretKey: "cgamemf",
    expiresIn: 60 * 60 * 24 * 30
  }
};
