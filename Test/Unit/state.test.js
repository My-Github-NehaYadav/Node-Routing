const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);
const server = require("../index");

describe("State API", () => {
    describe("/POST State API", () => {
        // it("It should POST state.", (done) => {
        //     let data = {
        //         State: "Himachal",
        //         Country: "61cc60da97f4fbb04fdc80f1"
        //     }
        //     chai.request(server)
        //         .post("/state")
        //         .send(data)
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.be.a("object");
        //             res.body.should.have.property('message').eql("New State added!");
        //             done();
        //         });
        // });

        it("It should not POST state & validationError!", (done) => {
            let data = {
                State: 08976,
                Country: "61cc60da97f4fbb04fdc80f1"
            }
            chai.request(server)
                .post("/state")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    res.body.should.have.property('message').eql("ValidationError...!");
                    done();
                });
        });

        it("It should not POST state & duplicateError!", (done) => {
            let data = {
                State: "Tamilnadu",
                Country: "61cc60da97f4fbb04fdc80f1"
            }
            chai.request(server)
                .post("/state")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(409);
                    res.body.should.be.a("object");
                    res.body.should.have.property('message').eql("DuplicateError...!");
                    done();
                });
        });
    });

    describe("/GET State API", () => {
        it("It should GET state.", (done) => {
            chai.request(server)
                .get("/state")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.length.should.be.greaterThan(0);
                    done();
                });
        });
    });
})