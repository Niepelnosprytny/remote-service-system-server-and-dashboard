import pool from '../../mysql';
import handleRequest from '../../handleRequest';
import crypto from 'crypto';

export default defineEventHandler(async (event) => {
    try {
        const body = await handleRequest(event.node.req);

        const hashedPassword = crypto.createHash('sha256').update(body.user.password).digest('hex');

        const results = await pool.query(
            'INSERT INTO user (email, password, name, surname, role, employer) VALUES (?, ?, ?, ?, ?, ?)',
            [
                body.user.email,
                hashedPassword,
                body.user.name,
                body.user.surname,
                body.user.role,
                body.user.employer,
            ]
        );

        return {
            status: 201,
            body: { data: results },
        };
    } catch (error) {
        console.error('Error executing query:', error);
        return {
            status: 500,
            body: { error: 'Internal Server Error' },
        };
    }
});