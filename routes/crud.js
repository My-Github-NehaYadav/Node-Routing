const users = require("../controllers/crud.controller");

module.exports = {
    config: (router) => {
        router.post("/", users.PostUser);
        router.get("/", users.GetUser);
        router.get("/:id", users.GetUserById);
        router.put("/:id", users.UpdateUserById);
        router.delete("/:id", users.DeleteUserById);
        return router;
    },
};