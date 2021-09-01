const UsersController = require("../controllers/usersController");


module.exports = (app) => {
    
    app.get("/api/users", UsersController.getAll);
}
