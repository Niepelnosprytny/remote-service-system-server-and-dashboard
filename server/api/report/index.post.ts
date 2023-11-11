import pool from '../../mysql';
import handleRequest from '../../handleRequest';

export default defineEventHandler(async (event) => {
    try {
        const body = await handleRequest(event.node.req);

        const results = await pool.query(
            'INSERT INTO report (title, content, status, location_id, created_by) VALUES (?, ?, ?, ?, ?)',
            [
                body.report.title,
                body.report.content,
                body.report.status,
                body.report.locationId,
                body.report.createdBy
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