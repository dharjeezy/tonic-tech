import mongoose from 'mongoose';
import dotenv from 'dotenv';
import config from './vars';
import { log } from '../utils/logger';

dotenv.config();

const dbUrl = config.dbUrl[config.env];
export default async () => {
    try {
        mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        mongoose.Promise = global.Promise;
        log.info('Database connected. OK');
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            log.error('Unable to connect to database .... .. .. .. ..');
        } else {
            log.error(error);
        }
    }
};
