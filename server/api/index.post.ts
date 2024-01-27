import pool from '../mysql';
export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if(!body) {
            return {
                status: 400,
                body: 'Bad request. Missing request body'
            };
        }

        const results = await pool.query(body);

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