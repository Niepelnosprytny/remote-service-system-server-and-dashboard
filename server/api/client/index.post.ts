import pool from '../../mysql';
import handleRequest from '../../handleRequest';

export default defineEventHandler(async (event) => {
    try {
        const body = await handleRequest(event.node.req);

        const results = await pool.query(
            'INSERT INTO client (name) VALUES (?)',
            [body.client.name]
        );

        return {
            status: 201,
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