import pool from '../../mysql';

export default defineEventHandler(async () => {
    try {
        const results = await pool.query('SELECT * FROM user_notification');

        return {
            status: 200,
            body: { data: results }
        };
    } catch (error) {
        console.error('Error executing query:', error);
        return {
            status: 500,
            body: { error: 'Internal Server Error' }
        };
    }
});
