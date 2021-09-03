const UsersController = require("../controllers/usersController");

module.exports = (app) => {
  //GET USERS
  app.get("/api/users/getAll", UsersController.getAll);

  //POST USERS
  app.post("/api/users/create", UsersController.register);
};
