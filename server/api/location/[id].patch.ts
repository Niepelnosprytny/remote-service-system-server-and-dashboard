import pool from '../../mysql';
import handleRequest from '../../handleRequest';

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id');
        const body = await handleRequest(event.node.req);

        if (!body.location) {
            return {
                status: 400,
                body: { error: 'Bad Request. Missing required location fields in the request body.' },
            };
        }

        const updateFields = Object.keys(body.location).map(key => `${key} = ?`).join(', ');
        const updateValues = Object.values(body.location);

        await pool.query(`UPDATE location SET ${updateFields} WHERE id = ?`, [...updateValues, id]);

        return {
            status: 200,
            body: { message: 'Location updated successfully' }
        };
    } catch (error) {
        console.error('Error updating location:', error);
        return {
            status: 500,
            body: { error: 'Internal Server Error' }
        };
    }
});