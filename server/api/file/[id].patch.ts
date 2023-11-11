import pool from '../../mysql';
import handleRequest from '../../handleRequest';

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id');
        const body = await handleRequest(event.node.req);

        if (!body.file) {
            return {
                status: 400,
                body: { error: 'Bad Request. Missing required file fields in the request body.' }
            };
        }

        const updateFields = Object.keys(body.file).map(key => `${key} = ?`).join(', ');
        const updateValues = Object.values(body.file);

        await pool.query(`UPDATE file SET ${updateFields} WHERE id = ?`, [...updateValues, id]);

        return {
            status: 200,
            body: { message: 'File updated successfully' }
        };
    } catch (error) {
        console.error('Error updating file:', error);
        return {
            status: 500,
            body: { error: 'Internal Server Error' }
        };
    }
});