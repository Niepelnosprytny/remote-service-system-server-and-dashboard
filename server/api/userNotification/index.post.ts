import pool from '../../mysql';
import handleRequest from '../../handleRequest';

export default defineEventHandler(async (event) => {
    try {
        const body = await handleRequest(event.node.req);

        const results = await pool.query(
            'INSERT INTO user_notification (user_id, notification_id) VALUES (?, ?)',
            [
                body.userNotification.userId,
                body.userNotification.notificationId,
            ]
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