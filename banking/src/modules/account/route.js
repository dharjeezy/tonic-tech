import express from 'express';
import controller from './controller';
import validateBody from '../../middleware/ValidateBody';
import authMiddleware from "../../middleware/AuthMiddleware";
import limiter from '../../middleware/rateLimit'

const router = express.Router();

router
    .route('/transfer')
    .post(
        limiter,
        authMiddleware("user"),
        validateBody('accountSchema', 'transfer'),
        controller.transfer,
    );
module.exports = router;
