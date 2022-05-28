const CountryModel = require("../models/country.model");
const CountrySchema = require("../schemas/country.schema").Country;
const ApiError = require('../middleware/Error');

const PostCountry = async function(req, res, next){
    let isValid = CountrySchema.validate(req.body);

    if (isValid.error) {
        return next(ApiError.validationError("ValidationError...!"));
    };

    try{
        let Result = await CountryModel.findOne({Country : req.body.Country});
        if(Result){
            return next(ApiError.duplicateError("DuplicateError...!"));
        };
        let result = await CountryModel.create(req.body);
        return res.status(200).json({
            message: "New Country added!"
        });
    }
    catch(err){
        return next(ApiError.badRequest("BadRequest....!"));
    };
};

const GetCountry = async function(req, res, next){

    try{
        let result = await CountryModel.find({}, {_id :0, __v:0});
        return res.status(200).json(result);
    }
    catch(err){
        return next(ApiError.badRequest("BadRequest....!"));
    };
};

module.exports = { PostCountry, GetCountry };