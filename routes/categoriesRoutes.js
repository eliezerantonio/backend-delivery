const CategoriesController = require("../controllers/categoriesController");

const passport = require("passport");

module.exports = (app) => {
  /*
  GET ALL
  */
  app.get(
    "/api/categories/getall",
    passport.authenticate("jwt", { session: false }),
    CategoriesController.getAll
  );

  /**
     * 
    POST
    * */

  app.post(
    "/api/categories/create",
    passport.authenticate("jwt", { session: false }),
    CategoriesController.create
  );
};
