import Joi from '@hapi/joi';

export const transfer = Joi.object({
    toAccountNumber: Joi.string().required(),
    amount: Joi.number().required(),
});
