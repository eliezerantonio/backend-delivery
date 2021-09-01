const UsersController = require("../controllers/usersController");

module.exports = (app) => {
  //GET USERS
  app.get("/api/users", UsersController.getAll);

  //POST USERS
  app.post("/api/users", UsersController.register);
};
