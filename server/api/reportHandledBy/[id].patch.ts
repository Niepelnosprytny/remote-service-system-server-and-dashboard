import pool from '../../mysql';
import handleRequest from '../../handleRequest';

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id');
        const body = await handleRequest(event.node.req);

        if (!body.reportHandledBy) {
            return {
                status: 400,
                body: { error: 'Bad Request. Missing required reportHandledBy fields in the request body.' },
            };
        }

        const updateFields = Object.keys(body.reportHandledBy).map(key => `${key} = ?`).join(', ');
        const updateValues = Object.values(body.reportHandledBy);

        await pool.query(`UPDATE report_handled_by SET ${updateFields} WHERE id = ?`, [...updateValues, id]);

        return {
            status: 200,
            body: { message: 'Report handling updated successfully' }
        };
    } catch (error) {
        console.error('Error updating report handling:', error);
        return {
            status: 500,
            body: { error: 'Internal Server Error' }
        };
    }
});