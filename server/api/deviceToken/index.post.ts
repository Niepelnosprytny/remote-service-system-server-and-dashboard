import pool from '~/server/mysql';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body || !body.token || !body.user_id) {
            return {
                status: 400,
                body: 'Bad Request. Missing required fields in the request body'
            };
        }

        const checkQuery = `SELECT * FROM device_token WHERE token = ?`;
        const checkResults = await pool.query(checkQuery, [body.token]);

        if (checkResults[0].length > 0) {
            const updateQuery = `UPDATE device_token SET user_id = ? WHERE token = ?`;
            await pool.query(updateQuery, [body.user_id, body.token]);

            return {
                status: 201,
                body: 'Device token updated successfully'
            };
        } else {
            const insertQuery = `INSERT INTO device_token (token, user_id) VALUES (?, ?)`;
            const insertResults = await pool.query(insertQuery, [body.token, body.user_id]);

            return {
                status: 201,
                body: insertResults[0].insertId
            };
        }
    } catch (error) {
        return {
            status: 500,
            body: `Internal Server Error - ${error.message}`
        };
    }
});