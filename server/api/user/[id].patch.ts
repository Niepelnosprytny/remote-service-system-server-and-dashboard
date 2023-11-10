import pool from '../../mysql';
import handleRequest from '../../handleRequest';
import crypto from 'crypto';

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id');
        const body = await handleRequest(event.node.req);

        if (body.user.password) {
            body.user.password = crypto.createHash('sha256').update(body.user.password).digest('hex');
        }

        const updateFields = Object.keys(body.user).map(key => `${key} = ?`).join(', ');
        const updateValues = Object.values(body.user);

        await pool.query(`UPDATE user SET ${updateFields} WHERE id = ?`, [...updateValues, id]);

        return {
            status: 200,
            body: { message: 'User updated successfully' },
        };
    } catch (error) {
        console.error('Error updating user:', error);
        return {
            status: 500,
            body: { error: 'Internal Server Error' },
        };
    }
});