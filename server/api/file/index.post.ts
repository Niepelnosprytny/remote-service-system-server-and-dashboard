import pool from '~/server/mysql';
import { saveFile } from "~/server/fileUtils";

export default defineEventHandler(async (event) => {
    try {
        const formData = await readMultipartFormData(event);

        if (!formData || formData.length === 0) {
            return {
                status: 400,
                body: 'Bad Request. Missing or empty request body'
            };
        }

        const IDs = [];

        const insertPromises = formData.map(async (item) => {
            if (item.name === 'file') {
                const report_id = parseInt(formData.find((item) => item.name === 'report_id').data.toString()) || null;
                const comment_id = parseInt(formData.find((item) => item.name === 'comment_id').data.toString()) || null;

                const { filetype, filename } = await saveFile(item);
                const query = 'INSERT INTO file (filename, report_id, comment_id, filetype) VALUES (?, ?, ?, ?)';
                const results = await pool.query(query, [filename, report_id, comment_id, filetype]);

                IDs.push(results[0].insertId)
            }
        });

        await Promise.all(insertPromises);

        return {
            status: 201,
            body: IDs
        };
    } catch (error) {
        return {
            status: 500,
            body: `Internal Server Error - ${error.message}`
        };
    }
});