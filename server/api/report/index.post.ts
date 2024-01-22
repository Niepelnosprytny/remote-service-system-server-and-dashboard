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

        const query = 'INSERT INTO report (title, content, status, location_id, created_by) VALUES (?, ?, ?, ?, ?)';
        const values = [body.title, body.content, body.status, body.location_id, body.created_by];

        const results = await pool.query(query, values);

        const reportId = results[0].insertId;

        for (const userId of body.users) {
            const reportHandledByQuery = 'INSERT INTO report_handled_by (user_id, report_id) VALUES (?, ?)';
            const reportHandledByValues = [userId, reportId];

            await pool.query(reportHandledByQuery, reportHandledByValues);
        }

        return {
            status: 201,
            body: reportId
        };
    } catch (error) {
        return {
            status: 500,
            body: `Internal Server Error - ${error.message}`
        };
    }
});