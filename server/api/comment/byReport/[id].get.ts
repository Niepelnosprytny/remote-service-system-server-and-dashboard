import pool from '~/server/mysql';

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id');

        const query = `SELECT *
FROM comment WHERE report_id = ?`;

        const results: any = await pool.query(query, [id]);

        if (results[0].length === 0) {
            return {
                status: 404,
                body: `Comments for report with id ${id} not found`
            };
        }

        return {
            status: 200,
            body: results[0]
        };
    } catch (error) {
        return {
            status: 500,
            body: `Internal Server Error - ${error.message}`
        };
    }
});