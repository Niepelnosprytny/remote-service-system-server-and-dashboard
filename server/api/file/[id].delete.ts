import pool from '~/server/mysql';
import { unlink } from 'fs/promises';

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id');

        const querySelect = 'SELECT filename FROM file WHERE id = ?';
        const resultsSelect = await pool.query(querySelect, [id]);

        if (resultsSelect[0].length === 0) {
            return {
                status: 404,
                body: `File with id ${id} not found`
            };
        }

        const {filename} = resultsSelect[0][0];

        const queryDelete = 'DELETE FROM file WHERE id = ?';
        const resultsDelete = await pool.query(queryDelete, [id]);

        if (resultsDelete[0].affectedRows === 0) {
            return {
                status: 500,
                body: `Failed to delete file with id ${id}`
            };
        }

        await unlink(`./public/files/${filename}`);

        return {
            status: 204,
            body: `File with id ${id} and associated file '${filename}' deleted successfully`
        };
    } catch (error) {
        return {
            status: 500,
            body: `Internal Server Error - ${error.message}`
        };
    }
});