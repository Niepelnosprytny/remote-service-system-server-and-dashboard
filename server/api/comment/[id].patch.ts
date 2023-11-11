import pool from '../../mysql';
import handleRequest from '../../handleRequest';

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id');
        const body = await handleRequest(event.node.req);

        if (!body.comment) {
            return {
                status: 400,
                body: { error: 'Bad Request. Missing required comment fields in the request body.' }
            };
        }

        const updateFields = Object.keys(body.comment).map(key => `${key} = ?`).join(', ');
        const updateValues = Object.values(body.comment);

        await pool.query(`UPDATE comment SET ${updateFields} WHERE id = ?`, [...updateValues, id]);

        return {
            status: 200,
            body: { message: 'Comment updated successfully' }
        };
    } catch (error) {
        console.error('Error updating comment:', error);
        return {
            status: 500,
            body: { error: 'Internal Server Error' }
        };
    }
});