import pool from '~/server/mysql';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body) {
            return {
                status: 400,
                body: 'Bad Request. Missing request body'
            };
        }

        for (const userNotificationId of body.ids) {
            const query = 'UPDATE user_notification SET seen = ? WHERE id = ?';
            const values = [body.seen, userNotificationId];

            await pool.query(query, values);
        }

        return {
            status: 200,
            body: `User_notification(s) with id(s) ${body.ids.join(", ")} has been updated successfully.`
        };
    } catch (error) {
        return {
            status: 500,
            body: `Internal Server Error - ${error.message}`
        };
    }
});