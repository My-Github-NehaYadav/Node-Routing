const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);
const server = require("../../index");


describe("Cities API", () => {
    describe("/POST City API", () => {
        // it("It should POST city.", (done) => {
        //     let data = {
        //         City: "Gwalior"
        //     }
        //     chai.request(server)
        //         .post("/city")
        //         .send(data)
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.be.a("object");
        //             res.body.should.have.property('message').eql("New City added!");
        //             done();
        //         });
        // });

        it("It should not POST city & validationError!", (done) => {
            let data = {
                City: 9977778
            }
            chai.request(server)
                .post("/city")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    res.body.should.have.property('message').eql("ValidationError...!");
                    done();
                });
        });


        it("It should not POST city & duplicateError!", (done) => {
            let data = {
                City: "Patyala"
            }
            chai.request(server)
                .post("/city")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(409);
                    res.body.should.be.a("object");
                    res.body.should.have.property('message').eql("DuplicateError...!");
                    done();
                });
        });
    });

    describe("/GET City API", () => {
        it("It should GET city.", (done) => {
            chai.request(server)
                .get("/city")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.length.should.be.greaterThan(0);
                    done();
                });
        });
    });
});