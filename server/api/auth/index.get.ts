import { signToken, verifyToken } from '~/server/jwtUtils';
import pool from '~/server/mysql';

export default defineEventHandler(async (event) => {
    const authorizationHeader = getRequestHeaders(event).authorization;

    if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1] ?? '';

        try {
            const { data } = await verifyToken(token);

            const query = 'SELECT id, email, name, surname, role, employer FROM user WHERE id = ?';

            const results = await pool.query(query, [data.id]);

            if (results[0].length === 0) {
                return {
                    status: 404,
                    body: 'User not found'
                };
            }

            const newToken = signToken({ id: results[0][0].id, role: results[0][0].role });

            return {
                status: 200,
                body: {
                    token: newToken,
                    user: results[0][0]
                }
            };
        } catch (error) {
            return {
                status: 401,
                body: 'Unauthorized'
            };
        }
    } else {
        return {
            status: 401,
            body: 'Missing authorization header'
        };
    }
});