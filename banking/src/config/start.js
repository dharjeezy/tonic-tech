import mongoose from 'mongoose';
import dbsetup from './database';
import * as redis from './cache';


const logConnectionDate = async () => {
    await redis.setAsync('connection_date', Date.now());
};

logConnectionDate();
dbsetup();

export default {
    validResourceId: mongoose.Types.ObjectId.isValid,
};
