import express from 'express';
import controller from './controller';
import validateBody from '../../middleware/ValidateBody';
import authMiddleware from "../../middleware/AuthMiddleware";

const router = express.Router();

router
    .route('/transfer')
    .post(
        authMiddleware,
        validateBody('accountSchema', 'transfer'),
        controller.signUp,
    );
module.exports = router;
