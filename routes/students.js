const students = require("../controllers/students.controllers");

module.exports = {
    config: (router) => {
        router.get("/", students.Login)
        router.post("/", students.Signup)
        router.put("/", students.UpdateStudent);
        return router;
    },
}   