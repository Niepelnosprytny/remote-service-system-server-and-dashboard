import pool from '../../mysql';
import handleRequest from '../../handleRequest';

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id');
        const body = await handleRequest(event.node.req);

        if (!body.client) {
            return {
                status: 400,
                body: { error: 'Bad Request. Missing client name in the request body.' }
            };
        }

        await pool.query('UPDATE client SET name = ? WHERE id = ?', [body.client.name, id]);

        return {
            status: 200,
            body: { message: 'Client updated successfully' }
        };
    } catch (error) {
        console.error('Error updating client:', error);
        return {
            status: 500,
            body: { error: 'Internal Server Error' }
        };
    }
});