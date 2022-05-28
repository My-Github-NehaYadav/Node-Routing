const server = require("../../index");
const chai = require("chai");
const request = require('supertest');
const expect = chai.expect;


describe('Users API Integration Tests', function () {
    describe('/POST users', function () {
        it('It should be SIGNUP', function (done) {
            request(server)
                .post('/users')
                .send({ FirstName: "rtrtr", LastName: "yadav", Phone_no: 5676876843, Email: "reenu23yadav1@gmail.com", Password: "hdftyt@123" })
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object'); 
                    expect(res.body.message).to.eql("One New User Created!"); 
                    done();
                });
        });
        it("It should be LOGIN", (done) => {
            let data = {
                Email: "reenu23yadav1@gmail.com"
            }
            request(server)
                .get("/users")
                .send(data)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.message).to.eql("Login successfully."); 
                    done();
                });
        });

    });
});