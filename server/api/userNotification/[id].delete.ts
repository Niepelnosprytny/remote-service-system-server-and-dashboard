import pool from '../../mysql';

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id');

        const results = await pool.query('DELETE FROM user_notification WHERE id = ?', [id]);

        if (results.affectedRows === 0) {
            return {
                status: 404,
                body: { error: 'User Notification not found' }
            };
        }

        return {
            status: 204,
        };
    } catch (error) {
        console.error('Error executing query:', error);
        return {
            status: 500,
            body: { error: 'Internal Server Error' }
        };
    }
});
