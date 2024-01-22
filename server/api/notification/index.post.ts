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

        console.log(body);

        const query = 'INSERT INTO notification (content, report_id) VALUES (?, ?)';
        const values = [body.content, body.report_id];

        console.log(query);
        console.log(values);

        const results = await pool.query(query, values);

        console.log(JSON.stringify(results));

        const notificationId = results[0].insertId;

        for (const userId of body.users) {
            console.log("Zaczyna się");
            const userNotificationQuery = 'INSERT INTO user_notification (user_id, notification_id) VALUES (?, ?)';
            const userNotificationValues = [userId, notificationId];

            console.log(userNotificationQuery);
            console.log(userNotificationValues);

            await pool.query(userNotificationQuery, userNotificationValues);
        }

        return {
            status: 201,
            body: notificationId
        };
    } catch (error) {
        return {
            status: 500,
            body: `Internal Server Error - ${error.message}`
        };
    }
});