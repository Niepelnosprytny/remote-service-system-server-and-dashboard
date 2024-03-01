import pool from '~/server/mysql';
import admin from 'firebase-admin';
import * as serviceAccount from '~/sebastian-inc-firebase-adminsdk-4ljw2-6afa8acd52.json';


if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body) {
            return {
                status: 400,
                body: 'Bad Request. Missing request body'
            };
        }

        const query = 'INSERT INTO notification (content, report_id) VALUES (?, ?)';
        const values = [body.content, body.report_id];

        const results = await pool.query(query, values);

        const notificationId = results[0].insertId;

        for (const userId of body.users) {
            const userNotificationQuery = 'INSERT INTO user_notification (user_id, notification_id) VALUES (?, ?)';
            const userNotificationValues = [userId, notificationId];

            await pool.query(userNotificationQuery, userNotificationValues);

            const deviceTokensResults = await pool.query("SELECT token FROM device_token WHERE user_id = ?", [userId]);
            const deviceTokens = deviceTokensResults[0].map(row => row.token);

            if(deviceTokens.length > 0) {
                const message = {
                    notification: {
                        title: "Sebastian Inc.",
                        body: body.content
                    },
                    data: {
                        reportId: body.report_id
                    },
                    tokens: deviceTokens
                };

                await admin.messaging().sendEachForMulticast(message);
            }
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