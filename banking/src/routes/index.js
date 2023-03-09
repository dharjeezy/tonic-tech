import express from 'express';
import ipMan from '../middleware/IpMan';

import authRoute from '../modules/auth/route';


const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({ i: 'Built by earthlings' });
});

router.use('/v1/auth', ipMan, authRoute);

export default router;
