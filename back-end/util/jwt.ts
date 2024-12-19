import jwt from 'jsonwebtoken';
import { Role } from '../types';

function generateSWTtoken(name: string, role: Role): string {
    const payload = { name, role };
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'song_tracker_app' };
    try {
        return jwt.sign(payload, process.env.JWT_SECRET!, options);
    } catch (error) {
        console.error(error);
        throw new Error('Error generating token, see server log');
    }
}

export { generateSWTtoken };