const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);
const server = require("../../index");

describe("CRUD API", () => {

    describe("/POST Crud API", () => {
        it("It should not POST & fieldsError!", (done) => {
            let data = {
                FirstName: "Neha",
                Phone_no: 3467968437,
                Email: "nehayadddav@gmail.com",
                Password: "neha123"
            }
            chai.request(server)
                .post("/crud")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    res.body.should.have.property('message').eql("All fields are required.");
                    done();
                });
        });

        it("It should not POST & validationError!", (done) => {
            let data = {
                FirstName: "Neha",
                LastName: "Yadav",
                Phone_no: 3467968437,
                Email: "nehayadddav@gmail.com",
                Password: 87654
            }
            chai.request(server)
                .post("/crud")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    res.body.should.have.property('message').eql("ValidationError.");
                    done();
                });
        });

        it("It Should not POST & duplicateError", (done) => {
            let data = {
                FirstName: "Neha",
                LastName: "Yadav",
                Phone_no: 3467968437,
                Email: "nehayadddav@gmail.com",
                Password: "neha123"
            }
            chai.request(server)
                .post("/crud")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(409);
                    res.body.should.be.a("object");
                    res.body.should.have.property('message').eql("DuplicateError...!");
                    done();
                });
        });
    });

    describe("/GET  Crud API", () => {
        it("It Should GET users.", (done) => {
            chai.request(server)
                .get("/crud")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.length.should.be.greaterThan(0);
                    done();
                });
        });
    })

    describe("/GET By Id Crud API", () => {
        it("It should GET By Id user.", (done) => {
            let id = "61c470702e4003e5d0bb9efd"
            chai.request(server)
                .get("/crud/" + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property('FirstName').eql("Neha");
                    res.body.should.have.property('LastName').eql("Yadav")
                    res.body.should.have.property('Phone_no').eql(3467968437)
                    res.body.should.have.property('Email').eql("nehayadav@gmail.com")
                    res.body.should.have.property('Password').eql("neha123")
                    done();
                });

        });

        it("It should not GET By Id user.", (done) => {
            let id = "61c470702e4003e5d0bb9efe"
            chai.request(server)
                .get("/crud/" + id)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    res.body.should.have.property('message').eql("BadRequest....!");
                    done();
                });

        });
    });

    describe("/Update By Id  Crud API", () => {
        it("It should UPDATE user.", (done) => {
            let data = {
                FirstName: "Neha",
                LastName: "Yadav",
                Phone_no: 3467968437,
                Email: "nehayadav@gmail.com",
                Password: "neha123"
            }
            let id = "61c470702e4003e5d0bb9efd";
            chai.request(server)
                .put("/crud/" + id)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property('message').eql("User updated successfully.");
                    done();
                });
        });

        it("It should not UPDATE user.", (done) => {
            let id = "61c470702e4003e5d0bb9efe"
            chai.request(server)
                .put("/crud/" + id)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    res.body.should.have.property('message').eql("BadRequest....!");
                    done();
                });
        })
    });

    describe("/Delete By Id  Crud API", () => {
        // it("It should DELETE user.", (done) => {
        //     let id = "61c473612e1859280c1766bc";
        //     chai.request(server)
        //         .delete("/crud/" + id)
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.be.a("object");
        //             res.body.should.have.property('message').eql("User deleted successfully.");
        //             done();
        //         });
        // });

        it("It should not DELETE user.", (done) => {
            let id = "61c470702e4003e5d0bb9efe"
            chai.request(server)
                .delete("/crud/" + id)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    res.body.should.have.property('message').eql("BadRequest....!");
                    done();
                });
        });
    });
})