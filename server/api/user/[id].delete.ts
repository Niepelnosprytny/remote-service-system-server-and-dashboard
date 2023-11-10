import pool from '../../mysql';

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id');

        // Delete user
        await pool.query('DELETE FROM user WHERE id = ?', [id]);

        return {
            status: 204,
        };
    } catch (error) {
        console.error('Error deleting user:', error);
        return {
            status: 500,
            body: { error: 'Internal Server Error' },
        };
    }
});