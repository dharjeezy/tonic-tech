import express from 'express';

import authRoute from '../modules/auth/route';
import accountRoute from '../modules/account/route'


const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({ i: 'Built by Damilare' });
});

router.use('/v1/auth', authRoute);
router.use('/v1/account', accountRoute);

export default router;
