import express from 'express';
import uuid from 'uuid/v4';
import cors from 'cors';
import helmet from 'helmet';
import { log } from '../utils/logger';
import routes from '../routes';
import limiter from './rateLimit'

const app = express();
app.use(express.json({
    verify(req, res, buf) {
    },
}));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(limiter);

app.use((req, res, next) => {
    const reqId = uuid();
    res.locals.log = log.child({ reqId });
    next();
});

app.use('/', routes);

app.use((err, req, res, next) => {
    res.locals.log.error(`Error processing request for route: ${req.method} ${req.route.path}`);
    res.locals.log.error(err);
    return res.status(500).json({ success: false, message: 'Unable to complete operation' });
});

app.get('*', (req, res) => {
    console.log("in route not found");
    res.status(404).json({ success: false, message: 'Route not found' });
});

export default app;
