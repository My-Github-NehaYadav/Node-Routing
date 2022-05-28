const Joi = require("joi");

const  CountrySchema = Joi.object({
    Country: Joi.string().required()
});

module.exports.Country = CountrySchema;