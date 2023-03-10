import Joi from '@hapi/joi';

export const signUp = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export const signIn = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export const refresh = Joi.object({
    refreshToken: Joi.string().required(),
});
