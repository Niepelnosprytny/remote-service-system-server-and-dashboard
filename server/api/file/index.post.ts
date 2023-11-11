import pool from '../../mysql';
import handleRequest from '../../handleRequest';

export default defineEventHandler(async (event) => {
    try {
        const body = await handleRequest(event.node.req);

        const results = await pool.query(
            'INSERT INTO file (filename, report_id, comment_id) VALUES (?, ?, ?)',
            [
                body.file.filename,
                body.file.reportId,
                body.file.commentId
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