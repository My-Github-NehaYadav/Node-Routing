const state = require("../controllers/state.controller");

module.exports = {
    config: (router) => {
        router.post("/", state.PostState);
        router.get("/", state.GetState);
        return router;
    }
}