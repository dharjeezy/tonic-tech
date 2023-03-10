# tonic-tech

This is a repo containing the assessment for

1. FizzBuzz function
2. Banking APIs

## FizzBuzz
You can find the FizzBuzz function in the current directory in the file named `fizzBuzz.js`

## Banking APIs

The Banking API is a node.js express service which contains 2 major modules

1. auth: Responsible for sign up and sign in
2. account: Responsible for account generation and transfer


### Implementation

The Banking API implements the following:

1. API versioning via the `route.js`.
2. Rate limiting mechanism via the `rateLimit.js` which can be found in the `middleware` section.
3. Role based authentication/authorization via the `AuthMiddleware.js` in the `middleware` section.
4. Refresh token re-authentication mechanism via the `auth` module `service` section.
5. Validation of requests


### Steps to run the Banking API service

1. navigate to the `banking` directory.
2. run `npm install` to install dependencies.
3. setup your `.env` file via the `.env.example`.
4. run `npm run dev` to startup the service.
