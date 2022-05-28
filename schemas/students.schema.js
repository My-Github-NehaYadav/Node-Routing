const Joi = require("joi");

const StudentSchema = Joi.object({
    FirstName : Joi.string().allow(""),
    LastName : Joi.string().allow(""),
    Phone_no : Joi.number().allow(""),
    Email: Joi.string().required(),
    Password: Joi.string().required()
});

exports.Schema = StudentSchema;