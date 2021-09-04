const db = require("../config/config");
const crypto = require("crypto");

const User = {};

User.getAll = () => {
  const sql = "SELECT * FROM users";

  return db.manyOrNone(sql);
};

User.create = (user) => {
  const myPasswordHashed = crypto
    .createHash("md5")
    .update(user.password)
    .digest("hex");
  user.password = myPasswordHashed;

  const sql = `INSERT INTO users(
    email,
	name,
	lastname,
	phone,
	password,
	created_at,
	updated_at)
	VALUES
	(
		$1,
		$2,
		$3,
		$4,
		$5,
		$6,
		$7
	
		
	) RETURNING id`;

  return db.oneOrNone(sql, [
    user.email,
    user.name,
    user.lastname,
    user.phone,
    user.password,
    new Date(),
    new Date(),
  ]);
};
User.findById = async (id, callback) => {
  const sql = `
SELECT id,email,name,lastname,image,password,session_token FROM users WHERE id =$1`;

  const user = await db.oneOrNone(sql, id);
  callback(null, user);
};
module.exports = User;
