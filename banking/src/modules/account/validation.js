import Joi from '@hapi/joi';

export const transfer = Joi.object({
    toAccount: Joi.string().required(),
    amount: Joi.number().required(),
});
