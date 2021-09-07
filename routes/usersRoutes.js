const UsersController = require("../controllers/usersController");

module.exports = (app, upload) => {
  //GET USERS
  app.get("/api/users/getAll", UsersController.getAll);

  //POST USERS
  app.post(
    "/api/users/create",
    upload.array("image", 1),
    UsersController.registerWithImage
  );

  //Login
  app.post("/api/users/login", UsersController.login);
};
