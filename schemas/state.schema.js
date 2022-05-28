const Joi = require("joi");

const  StateSchema = Joi.object({
    State: Joi.string().required(),
    Country: Joi.string().required()
});

module.exports.State = StateSchema;