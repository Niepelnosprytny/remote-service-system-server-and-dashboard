import pool from '../mysql';
import handleRequest from '../handleRequest';

export default defineEventHandler(async (event) => {
    try {
        const body = await handleRequest(event.node.req);

        const results = await pool.query(body.query);

        return {
            status: 200,
            body: { data: results[0] }
        };
    } catch (error) {
        console.error('Error executing query:', error);
        return {
            status: 500,
            body: { error: `Internal Server Error - ${error.message}` },
        };
    }
});