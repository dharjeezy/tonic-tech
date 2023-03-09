import requestIp from 'request-ip';
import dotenv from 'dotenv';
import geoip from 'geoip-lite';
import DeviceDetector from 'node-device-detector';

dotenv.config();

// Configure static ip for only local environment.
const ipMan = async (req, res, next) => {
    const userAgent = req.headers['user-agent'];
    const clientIp = process.env.NODE_ENV === 'development' ? '105.112.102.139' : requestIp.getClientIp(req);
    const geo = geoip.lookup(clientIp);
    const detector = new DeviceDetector();
    const thisDevice = detector.detect(userAgent);
    res.locals.geo = geo;
    res.locals.device = thisDevice;
    next();
};
export default ipMan;
