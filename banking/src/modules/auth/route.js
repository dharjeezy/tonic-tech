import express from 'express';
import controller from './controller';
import validateBody from '../../middleware/ValidateBody';
import limiter from "../../middleware/rateLimit";

const router = express.Router();

router
    .route('/signup')
    .post(
        limiter,
        validateBody('authSchema', 'signUp'),
        controller.signUp,
    );
router
    .route('/signin')
    .post(
        limiter,
        validateBody('authSchema', 'signIn'),
        controller.signIn,
    );

router
    .route('/refresh')
    .post(
        limiter,
        validateBody('authSchema', 'refresh'),
        controller.refresh,
    );
module.exports = router;
