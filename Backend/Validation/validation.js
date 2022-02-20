const Joi = require("joi");

const registerValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        apartment: Joi.string().min(2).required(),
    });

    return schema.validate(data);
};

const loginValidator = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};

const flatValidator = (data) => {
    const schema = Joi.object({
        flat_id: Joi.string().required(),
        apartment: Joi.string().required(),
        block: Joi.string().min(1).required(),
        type: Joi.string().required(),
        flatNumber: Joi.number().required(),
        residents: Joi.array()
    })
    return schema.validate(data);
}

module.exports.registerValidator = registerValidator;
module.exports.loginValidator = loginValidator;
module.exports.flatValidator = flatValidator;