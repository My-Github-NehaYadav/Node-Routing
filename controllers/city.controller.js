const CityModel = require("../models/city.model");
const CitySchema = require("../schemas/city.schema").City;
const ApiError = require('../middleware/Error');

const PostCity = async function (req, res, next) {
    let isValid = CitySchema.validate(req.body);

    if (isValid.error) {
        return next(ApiError.validationError("ValidationError...!"));
    };

    try {
        let Result = await CityModel.findOne({ City: req.body.City });
        if (Result) {
            return next(ApiError.duplicateError("DuplicateError...!"));
        };
        let result = await CityModel.create(req.body);
        return res.status(200).json({
            message: "New City added!"
        });
    }
    catch (err) {
        return next(ApiError.badRequest("BadRequest....!"));
    };
};

const GetCity = async function (req, res, next) {
    try {
        let result = await CityModel.find({}, { _id: 0, __v: 0 });
        return res.status(200).json(result);
    }
    catch (err) {
        return next(ApiError.badRequest("BadRequest....!"));
    };
};

module.exports = { PostCity, GetCity };