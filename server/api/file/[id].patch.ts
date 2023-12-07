import pool from '~/server/mysql';

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id');
        const body = await readBody(event);

        if (!body) {
            return {
                status: 400,
                body: 'Bad Request. Missing request body'
            };
        }

        const { filename, report_id, comment_id } = body;

        if (!filename && report_id === undefined && comment_id === undefined) {
            return {
                status: 400,
                body: 'Bad Request. At least one field required for update'
            };
        }

        const fieldsToUpdate = Object.entries(body).filter(([key, value]) => value !== undefined);
        const setPart = fieldsToUpdate.map(([field, value]) => `${field} = ?`).join(', ');

        const query = `
      UPDATE file
      SET ${setPart}
      WHERE id = ?
    `;

        const values = fieldsToUpdate.map(([_, value]) => value);
        const results = await pool.query(query, [...values, id]);

        if (results[0].affectedRows === 0) {
            return {
                status: 404,
                body: `File with id ${id} not found`
            };
        }

        return {
            status: 200,
            body: `File with id ${id} updated successfully`
        };
    } catch (error) {
        return {
            status: 500,
            body: `Internal Server Error - ${error.message}`
        };
    }
});