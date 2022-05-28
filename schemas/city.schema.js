const Joi = require("joi");

const CitySchema = Joi.object({
    City: Joi.string().required()
});

module.exports.City = CitySchema;