const usersController = require("../controllers").users;
const { authorizeJwt } = require("../middlewares");
module.exports = app => {
    app.get("/api/users/:userId", usersController.show);

    app.put("/api/users/:userId", 
            [ authorizeJwt.verifyToken ],
            usersController.update);
}