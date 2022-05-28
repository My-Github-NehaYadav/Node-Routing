const users = require("../controllers/users.controller");

module.exports = {
    config: (router) => {
        router.get("/", users.Login);
        router.post("/", users.Signup);
        router.put("/", users.UpdateUser);
        return router;
    },
};