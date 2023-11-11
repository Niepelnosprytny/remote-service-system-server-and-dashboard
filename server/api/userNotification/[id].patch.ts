import pool from '../../mysql';
import handleRequest from '../../handleRequest';

export default defineEventHandler(async (event) => {
    try {
        const id = event.node.params.id;
        const body = await handleRequest(event.node.req);

        const updateFields = Object.keys(body.userNotification).map(key => `${key} = ?`).join(', ');
        const updateValues = Object.values(body.userNotification);

        await pool.query(`UPDATE user_notification SET ${updateFields} WHERE id = ?`, [...updateValues, id]);

        return {
            status: 200,
            body: { message: 'User Notification updated successfully' }
        };
    } catch (error) {
        console.error('Error updating user notification:', error);
        return {
            status: 500,
            body: { error: 'Internal Server Error' }
        };
    }
});