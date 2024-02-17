import pool from '~/server/mysql';

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id');

        const query = `SELECT content, created_at, report_id, seen
FROM notification, user, user_notification
WHERE user_notification.notification_id = notification.id
AND user_notification.user_id = user.id
AND user.id = ?;`;

        const results: any = await pool.query(query, [id]);

        if (results[0].length === 0) {
            return {
                status: 404,
                body: `Notifications for user with id ${id} not found`
            };
        }

        return {
            status: 200,
            body: results[0]
        };
    } catch (error) {
        return {
            status: 500,
            body: `Internal Server Error - ${error.message}`
        };
    }
});