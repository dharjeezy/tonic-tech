import bcrypt from 'bcrypt';
import {
    User,
} from './model';
import * as accountService from '../account/service'
import redis from 'redis';
import * as middleware from '../../middleware/AuthMiddleware'
import ServiceError from '../../helpers/ServiceError';

const redisClient = redis.createClient();

const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const user = new User({ firstName, lastName, email, password: hashedPassword });
        await user.save();

        // create new account for user
        const account = accountService.createAccount({userId: user.id});

        //TODO: return account number and user id

        // generate access token
        const accessToken = middleware.generateAccessToken(user._id, user.role);

        return accessToken;
    } catch (err) {
        console.error(err);
        throw new ServiceError('Something went wrong...', 500);
    }
};

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // find user by email
        const user = await User.findOne({ email });
        if (!user) {
            throw new ServiceError('Invalid email or password', 401);
        }

        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new ServiceError('Incorrect login credentials', 401);
        }

        // generate access token
        const accessToken = middleware.generateAccessToken(user._id, user.role);

       return accessToken;
    } catch (err) {
        console.error(err);
        throw new ServiceError('Something went wrong...', 500);
    }
};

export {
    signup,
    signin
};
