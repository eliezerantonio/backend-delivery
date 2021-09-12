const UsersController = require("../controllers/usersController");
const passport = require("passport");
module.exports = (app, upload) => {
  //GET USERS
  app.get(
    "/api/users/getAll",

    UsersController.getAll
  );
  //Busca

  //GET USERS BY ID
  app.get(
    "/api/users/findById/:id",
    passport.authenticate("jwt", { session: false }),
    UsersController.findByUserId
  );
  //Busca

  //POST USERS
  app.post(
    "/api/users/create",
    passport.authenticate("jwt", { session: false }),
    upload.array("image", 1),
    UsersController.registerWithImage
  );

  //Login
  app.post("/api/users/login", UsersController.login);
  app.post("/api/users/logout", UsersController.logout);

  //update
  app.put(
    "/api/users/update",
    passport.authenticate("jwt", { session: false }),
    upload.array("image", 1),
    UsersController.update
  );
};
