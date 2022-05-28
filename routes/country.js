const country = require("../controllers/country.controller");

module.exports = {
    config : (router) => {
        router.post("/", country.PostCountry);
        router.get("/", country.GetCountry);
        return router;
    }
}