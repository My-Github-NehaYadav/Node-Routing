const model = require("../models/user.model");
const Schema = require("../schemas/students.schema").Schema;
const ApiError = require('../middleware/Error');


const PostUser = async function (req, res, next) {
    if ((req.body.FirstName === undefined || req.body.LastName === undefined || req.body.Phone_no === undefined || req.body.Email === undefined || req.body.Password === undefined)) {
        return next(ApiError.badRequest("All fields are required."));
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
        let result = await model.findOne({ Email });
        if (result) {
            return next(ApiError.duplicateError("DuplicateError...!"));
        }
        let Result = await model.create(payload);
        return res.status(200).json({
            message: "One New User saved!",
            status: 200
        });
    }
    catch (err) {
        return next(ApiError.badRequest("BadRequest....!"));
    };
};

const GetUser = async function (req, res, next) {
    try {
        let result = await model.find({});
        return res.status(200).json(result);
    }
    catch (err) {
        return next(ApiError.badRequest("BadRequest....!"));
    };
};

const GetUserById = async function (req, res, next) {
    let id = req.params.id;
    try {
        let result = await model.findById({ _id: id });
        if (result) {
            return res.status(200).json(result);
        } else {
            return next(ApiError.badRequest("BadRequest....!"));
        };
    }
    catch (err) {
        return next(ApiError.badRequest("BadRequest....!"));
    };
};

const UpdateUserById = async function (req, res, next) {
    let id = req.params.id;
    try {
        let result = await model.findByIdAndUpdate(id, req.body);
        if (result) {
            return res.status(200).json({
                message: "User updated successfully.",
                status: 200
            })
        } else {
            return next(ApiError.badRequest("BadRequest....!"));
        };
    }
    catch (err) {
        return next(ApiError.badRequest("BadRequest....!"));
    };
};

const DeleteUserById = async function (req, res, next) {
    let id = req.params.id;
    try{
        let result = await model.findByIdAndDelete(id);
        if(result){
            return res.status(200).json({
                message: "User deleted successfully.",
                status: 200
            });
        }else{
            return next(ApiError.badRequest("BadRequest....!"));
        }
    }
    catch(err){
        return next(ApiError.badRequest("BadRequest....!"));
    }
}

module.exports = {
    PostUser,
    GetUser,
    GetUserById,
    UpdateUserById,
    DeleteUserById
};