const Users = require("../models/user.model");
const Schema = require("../schemas/students.schema").Schema;
const ApiError = require('../middleware/Error');

const Signup = async function (req, res, next) {
    if((req.body.FirstName === undefined || req.body.LastName === undefined || req.body.Phone_no === undefined || req.body.Email=== undefined || req.body.Password === undefined)){
        return next(ApiError.badRequest("All fields are required ."));
    }
    let { FirstName, LastName, Phone_no, Email, Password } = req.body;
    
    let payload = {
        FirstName,
        LastName,
        Phone_no,
        Email,
        Password
    };
    let isValid = Schema.validate(payload);
    if (isValid.error) {
        return next(ApiError.validationError("ValidationError."));
    };

    try {
        let result = await Users.create(payload);
        return res.status(200).json({
            message: "One New User Created!",
            status: 200
        });
    }
    catch (err) {
        console.log(err)
        return next(ApiError.badRequest("BadRequest....!"));
    };
};

const Login = async function (req, res, next) {

    if(! req.body.Email){
        return next(ApiError.validationError("Data is require!"));
    };

    try {
        let result = await Users.findOne({ "Email": req.body.Email });
        if (result) {
            return res.status(200).json({ message: 'Login successfully.', status: 200 });
        } else {
            return next(ApiError.unauthorize("Unauthorized user."));
        };
    }
    catch (err) {
        return next(ApiError.badRequest("BadRequest....!"));
    };
};

const UpdateStudent = async function (req, res, next) {
    let { FirstName, LastName, Phone_no, Email, Password } = req.body;

    let payload = {
        FirstName,
        LastName,
        Phone_no,
        Email,
        Password
    };

    try {
        let result = await Users.findOneAndUpdate({"Email" : Email}, payload);
        if(result){
            return res.status(200).json({
                message: "Updated successfully.",
                status: 200
            });
        }else{
            return next(ApiError.badRequest("BadRequest....!"));
        }
    }
    catch (err) {
        return next(ApiError.badRequest("BadRequest....!"));
    };
}

module.exports = { Signup, Login, UpdateStudent };