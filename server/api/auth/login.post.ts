import pool from '../../mysql';
import jwt from 'jsonwebtoken';
import crypto from "crypto";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        console.log(body);

        if (!body) {
            return {
                status: 400,
                body: 'Bad Request. Missing credentials'
            };
        }

        const query = 'SELECT * FROM user WHERE email = ? AND password = ?';

        const hashedPassword = crypto.createHash('sha256').update(body.password).digest('hex');

        console.log(hashedPassword);

        const results = await pool.query(query, [body.email, hashedPassword]);

        if (results[0].length === 0) {
            return {
                status: 401,
                body: 'Invalid credentials'
            };
        }

        const token = jwt.sign({ email: body.email }, process.env.JWT_SECRET_KEY);

        return {
            status: 200,
            body: {
                token: token,
                user: results[0]
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