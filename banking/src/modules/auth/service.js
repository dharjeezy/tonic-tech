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

        const { firstName, lastName, email, phone, password } = req.body;

        const alreadyExistingUser = await User.findOne({
            email,
        });
        if (alreadyExistingUser) {
            throw new ServiceError('User with email already exists...', 406);
        }

        const hashedPassword = await bcrypt.hash(password, process.env.BCRYPT_HASH_SALT_ROUNDS);

        // create new user
        const user = await User({ firstName, lastName, email, phone, password: hashedPassword }).save();

        // create new account for user
        const account = await accountService.createAccount({userId: user.id});

        return account;

};

const signin = async (req, res) => {
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
        const refreshToken = middleware.refreshToken(user._id, user.role);

        // Store the refresh token in Redis
        await setRefreshedTokenInCache(user._id, refreshToken);

       return {accessToken, refreshToken};

};

const refresh = async (req, res) => {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
            throw new ServiceError('Authentication Failed', 401);
        }

        const decoded = middleware.decodeToken(refreshToken);
        const userId = decoded.userId;

        let storedRefreshedToken = null;
        // Retrieve the stored refresh token from Redis
        await getRefreshedTokenInCache(userId).then((data) => {
            storedRefreshedToken = data;
        });

        if (refreshToken !== storedRefreshedToken) {
            throw new ServiceError('Authentication Failed', 401);
        }

        const accessToken = middleware.generateAccessToken(userId, decoded.role)
        return accessToken;
};

async function setRefreshedTokenInCache(userId, value) {
    redisClient.set(userId.toString(), value, (err, reply) => {
        if (err) {
            console.error(`error setting key in redis ${err}`);
        } else {
            console.log(`Value set: ${reply}`);
        }
    });
}

async function getRefreshedTokenInCache(userId) {
   return new Promise((resolve, reject) => {
        redisClient.get(userId.toString(), (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log(`Value retrieved: ${result}`);
                resolve(result);
            }
        });
    });
}

export {
    signup,
    signin,
    refresh
};
