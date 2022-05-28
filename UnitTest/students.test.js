const chai = require("chai");
const chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
const server = require('../../index');

describe("Students API", () => {
    // test login route...
    describe("/GET Login API", () => {
        it("It should be LOGIN", (done) => {
            let data = {
                Email: "nehayadav@gmail.com"
            }
            chai.request(server)
                .get("/students")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property('message').eql("Login successfully.");
                    done();
                });
        });

        it("It should not LOGIN", (done) => {
            let data = {
                Email: "nehayaddav@gmail.com"
            }
            chai.request(server)
                .get("/students")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a("object");
                    res.body.should.have.property('message').eql("Unauthorized user.");
                    done();
                });
        });
    });

    // test signup route...
    describe("/POST Signup API", () => {
        it("It should be SIGNUP", (done) => {
            let data = {
                FirstName: "Neha",
                LastName: "Yadav",
                Phone_no: 3467968437,
                Email: "nehayadav@gmail.com",
                Password: "neha123"
            }
            chai.request(server)
                .post("/students")
                .send(data)
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a("object");
                    res.body.should.have.property('message').eql("One New User Created!");
                    done();
                });
        });

        it("It should not be SIGNUP, fieldsError", (done) => {
            let data = {
                FirstName: "Neha",
                LastName: "Yadav",
                Phone_no: 3467968437,
                Password: "neha123"
            }
            chai.request(server)
                .post("/students")
                .send(data)
                .end((err, res) => {
                    (res).should.have.status(400);
                    (res.body).should.be.a("object");
                    res.body.should.have.property('message').eql("All fields are required .");
                    done();
                });
        });

        it("It should not be SIGNUP, validationError", (done) => {
            let data = {
                FirstName: "Neha",
                LastName: "Yadav",
                Phone_no: "A3467968437",
                Email: "nehayadav@gmail.com",
                Password: "neha123"
            }
            chai.request(server)
                .post("/students")
                .send(data)
                .end((err, res) => {
                    (res).should.have.status(404);
                    (res.body).should.be.a("object");
                    res.body.should.have.property('message').eql("ValidationError.");
                    done();
                });
        });
    });

    //test update route...
    describe("/PUT students API", () => {
        it("It should UPDATE a student", (done) => {
            let data = {
                FirstName: "Neha",
                LastName: "Yadav",
                Phone_no: 3467968437,
                Email: "nehayadav@gmail.com",
                Password: "neha123"
            }
            chai.request(server)
                .put("/students")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property('message').eql("Updated successfully.");
                    done();
                });
        });
    });
});

