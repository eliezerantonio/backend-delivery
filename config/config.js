const promise = require("bluebird");
const options = {
  promiseLib: promise,
  query: (e) => {},
};
const pgp = require("pg-promise")(options);
const types = pgp.pg.types;
types.getTypeParser(1114, function (stringValue) {
  return stringValue;
});

const databaseConfig = {
  host: "127.0.0.1",
  port: 5432,
  database: "delivery_db",
  user: "postgres",
  password: "1223",
};

const db = pgp(databaseConfig);

module.exports = db;
