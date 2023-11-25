import pool from '~/server/mysql';
import { signToken } from "~/server/jwtUtils";
import crypto from "crypto";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body) {
            return {
                status: 400,
                body: 'Bad Request. Missing credentials'
            };
        }

        const query = 'SELECT id, email, name, surname, role, employer FROM user WHERE email = ? AND password = ?';

        const hashedPassword = crypto.createHash('sha256').update(body.password).digest('hex');

        const results = await pool.query(query, [body.email, hashedPassword]);

        if (results[0].length === 0) {
            return {
                status: 404,
                body: 'User not found'
            };
        }

        const token = signToken({ id: results[0][0].id, role: results[0][0].role });

        return {
            status: 200,
            body: {
                token: token,
                user: results[0][0]
            }
        };
    }
    catch(error) {
            console.error('Login error:', error);
            return {
                status: 500,
                body: `Internal Server Error - ${error.message}`
            };
        }
    }
);