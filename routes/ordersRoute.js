const OrdersController = require("../controllers/ordersController");

const passport = require("passport");

module.exports = (app) => {
  /**GET */

  app.post(
    "/api/orders/create",
    passport.authenticate("jwt", { session: false }),
    OrdersController.create
  );
};
