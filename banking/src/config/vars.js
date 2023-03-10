import dotenv from 'dotenv';

dotenv.config();

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    dbUrl: {
        development: process.env.DB_DEV_URL,
        production: process.env.DB_PRODUCTION_URL,
        test: process.env.DB_TEST_URL,
    },
    jwtSecret: process.env.JWT_SECRET,
    bcryptHashSaltRounds: process.env.BCRYPT_HASH_SALT_ROUNDS,
};
