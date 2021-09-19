const ProductsController = require("../controllers/productsController");

const passport = require("passport");

module.exports = (app, upload) => {
  app.post(
    "/api/products/create",
    passport.authenticate("jwt", { session: false }),
    upload.array("image", 3),
    ProductsController.create
  );
  app.get(
    "/api/products/findByCategory/:idCategory",
    passport.authenticate("jwt", { session: false }),
 
    ProductsController.findByCategory
  );
};
