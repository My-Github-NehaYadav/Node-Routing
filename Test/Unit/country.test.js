const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);
const server = require("../index");

describe("Countries API", () => {
    describe("/POST Country API", () => {
        // it("It should POST country.", (done) => {
        //     let data = {
        //         Country : "Canada"
        //     }
        //     chai.request(server)
        //         .post("/country")
        //         .send(data)
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.be.a("object");
        //             res.body.should.have.property('message').eql("New Country added!");
        //             done();
        //         });
        // });

        it("It should not POST country & validationError", (done) => {
            let data = {
                Country : "Chiine"
            }
            chai.request(server)
                .post("/country")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(409);
                    res.body.should.be.a("object");
                    res.body.should.have.property('message').eql("DuplicateError...!");
                    done();
                });
        });

        it("It should not POST country & duplicateErrro!", (done) => {
            let data = {
                Country : 87787
            }
            chai.request(server)
                .post("/country")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    res.body.should.have.property('message').eql("ValidationError...!");
                    done();
                });
        });
    });

    describe("/GET Country API", () => {
        it("It should GET country.", (done) => {
            chai.request(server)
                .get("/country")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.length.should.be.greaterThan(0);
                    should.not.exist(err);
                    done();
                });
        });
    });
})