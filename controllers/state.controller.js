const StateModel = require("../models/state.model");
const StateSchema = require("../schemas/state.schema").State;
const ApiError = require('../middleware/Error');

const PostState = async function (req, res, next) {

    let state = req.body;
    let isValid = StateSchema.validate(state);

    if (isValid.error) {
        return next(ApiError.validationError("ValidationError...!"));
    };

    try {
        let Result = await StateModel.findOne({ State: req.body.State });
        if (Result) {
            return next(ApiError.duplicateError("DuplicateError...!"));
        }
        let result = await StateModel.create(state);
        return res.status(200).json({
            message: "New State added!"
        });
    }
    catch (err) {
        return next(ApiError.badRequest("BadRequest....!"));
    };
};


const GetState = async function (req, res, next) {
    try {
        await StateModel.find({}, { _id: 0, __v: 0 })
            .populate('Country')
            .exec(function (err, docs) {
                return res.status(200).json(docs);
            });
    }
    catch (err) {
        return next(ApiError.badRequest("BadRequest....!"));
    };
};

module.exports = { PostState, GetState };