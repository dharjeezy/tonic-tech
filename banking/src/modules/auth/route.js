import express from 'express';
import controller from './controller';
import validateBody from '../../middleware/ValidateBody';

const router = express.Router();

router
    .route('/signup')
    .post(
        validateBody('authSchema', 'signUp'),
        controller.signUp,
    );
router
    .route('/signin')
    .post(
        validateBody('authSchema', 'signIn'),
        controller.signUp,
    );
module.exports = router;
