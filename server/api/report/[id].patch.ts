import pool from '../../mysql';
import handleRequest from '../../handleRequest';

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id');
        const body = await handleRequest(event.node.req);

        if (!body.report) {
            return {
                status: 400,
                body: { error: 'Bad Request. Missing required report fields in the request body.' }
            };
        }

        const updateFields = Object.keys(body.report).map(key => `${key} = ?`).join(', ');
        const updateValues = Object.values(body.report);

        await pool.query(`UPDATE report SET ${updateFields} WHERE id = ?`, [...updateValues, id]);

        return {
            status: 200,
            body: { message: 'Report updated successfully' }
        };
    } catch (error) {
        console.error('Error updating report:', error);
        return {
            status: 500,
            body: { error: 'Internal Server Error' }
        };
    }
});