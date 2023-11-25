import pool from '~/server/mysql';
import { signToken } from '~/server/jwtUtils';
import crypto from 'crypto';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body) {
            return {
                status: 400,
                body: 'Bad Request. Missing request body'
            };
        }

        const hashedPassword = crypto.createHash('sha256').update(body.password).digest('hex');

        const query = `INSERT INTO user (email, password, name, surname, role, employer) VALUES (?, ?, ?, ?, ?, ?)`;

        const results = await pool.query(query, [body.email, hashedPassword, body.name, body.surname, body.role, body.employer]);

        const token = signToken({ id: body.id, role: body.role });

        return {
            status: 201,
            body: {
                token: token,
                user: results[0][0]
            },
        };
    } catch (error) {
        console.error('Error executing query for user registration:', error);
        return {
            status: 500,
            body: `Internal Server Error - ${error.message}`
        };
    }
});