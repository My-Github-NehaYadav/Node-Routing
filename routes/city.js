const city = require("../controllers/city.controller");

module.exports = {
    config: (router) => {
        router.post("/", city.PostCity);
        router.get("/", city.GetCity);
        return router;
    }
};