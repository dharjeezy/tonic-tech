import Joi from '@hapi/joi';
import mongoose from 'mongoose';

const isValidId = mongoose.Types.ObjectId.isValid;

const validResourceId = Joi.string().custom((value, helpers) => {
    if (!isValidId(value)) return helpers.error('any.invalid');
    return value;
});

export default {
    validResourceId,
};
