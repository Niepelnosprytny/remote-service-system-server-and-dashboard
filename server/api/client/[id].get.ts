import pool from '../../mysql';

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id');

        const results = await pool.query('SELECT * FROM client WHERE id = ?', [id]);

        if (results.length === 0) {
            return {
                status: 404,
                body: { error: 'Client not found' }
            };
        }

        return {
            status: 200,
            body: { data: results[0] }
        };
    } catch (error) {
        console.error('Error executing query:', error);
        return {
            status: 500,
            body: { error: 'Internal Server Error' }
        };
    }
});