import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { authModel } from '../modules/auth/model';

dotenv.config();

export function generateAccessToken(userId, role) {
    return jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

export const authenticate = (role) => async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header not found." });
        }

        const [_, accessToken] = authHeader.split(" ");

        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
            if (err) {
                return res.status(401).json({ message: "Invalid access token." });
            }

            const { userId, role: userRole } = payload;

            // check user role
            if (role && userRole !== role) {
                return res.status(403).json({ message: "You do not have permission to perform this action." });
            }

            // attach user id to request object
            req.userId = userId;

            next();
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error." });
    }
};

export default authenticate;
