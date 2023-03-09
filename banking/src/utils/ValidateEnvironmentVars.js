const dotenv = require('dotenv');

dotenv.config();
const STAGING = 'staging';
const TEST = 'test';
const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

let currentEnvironment = process.env.NODE_ENV;
if (!process.env.NODE_ENV) {
    console.log('NODE_ENV is not set in environment, defaulting to "development"');
    process.env.NODE_ENV = DEVELOPMENT;
    currentEnvironment = DEVELOPMENT;
}

const environmentVars = {
    APP_NAME: {
        severityLevel: 2,
        env: [TEST, DEVELOPMENT, STAGING, PRODUCTION],
        defaultValue: 'mars',
    },
    PORT: {
        severityLevel: 2,
        env: [TEST, DEVELOPMENT, STAGING, PRODUCTION],
        defaultValue: 8080,
    },
    DB_DEV_URL: {
        severityLevel: 1,
        env: [DEVELOPMENT],
        default: '',
    },
    DB_TEST_URL: {
        severityLevel: 1,
        env: [TEST],
        default: '',
    },
    DB_STAGING_URL: {
        severityLevel: 1,
        env: [STAGING],
        default: '',
    },
    DB_PRODUCTION_URL: {
        severityLevel: 1,
        env: [PRODUCTION],
        default: '',
    },
    JWT_SECRET: {
        severityLevel: 1,
        env: [TEST, DEVELOPMENT, STAGING, PRODUCTION],
        default: 'pleaseallowyourcattypethis',
    },
    BCRYPT_HASH_SALT_ROUNDS: {
        severityLevel: 2,
        env: [TEST, DEVELOPMENT, STAGING, PRODUCTION],
        defaultValue: 10,
    },
    LOG_LEVEL: {
        severityLevel: 2,
        env: [TEST, DEVELOPMENT, STAGING, PRODUCTION],
        defaultValue: 'debug',
    },
    SERVER_APP_URL: {
        severityLevel: 2,
        env: [TEST, DEVELOPMENT, STAGING, PRODUCTION],
        defaultValue: '',
    },
};

const variableNames = Object.keys(environmentVars);

variableNames.forEach((name) => {
    const {
        severityLevel, env, message, defaultValue,
    } = environmentVars[name];
    if (!env.includes(currentEnvironment)) return;
    switch (severityLevel) {
        case 1: {
            if (!process.env[name] && defaultValue) {
                console.warn(message || `Missing required env var ${name}. Defaulting to a value of "${defaultValue}"`);
                process.env[name] = defaultValue;
            } else if (!process.env[name]) throw Error(message || `Missing required env var "${name}". App can't start without it.`);
            break;
        }
        case 2: {
            if (!process.env[name] && defaultValue) {
                console.warn(message || `Missing needed env var "${name}". Defaulting to a value of "${defaultValue}"`);
                process.env[name] = defaultValue;
            } else if (!process.env[name]) console.warn(message || `Missing needed env var "${name}". Some features of the app might not work`);
            break;
        }
        default: {
            console.log(`Severity level for env var: "${name}" is not set, not sure if it is needed or not`);
        }
    }
});
