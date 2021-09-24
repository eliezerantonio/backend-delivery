const AddressController = require("../controllers/addressController");

const passport = require("passport");

module.exports = (app) => {
  /*
  GET ALL
  */
  //   app.get(
  //     "/api/address/getall",
  //     passport.authenticate("jwt", { session: false }),
  //     AddressController.getAll
  //   );

  /**
     * 
    POST
    * */

  app.post(
    "/api/address/create",
    passport.authenticate("jwt", { session: false }),
    AddressController.create
  );
};
