import pool from '~/server/mysql';
import { writeFile, unlink } from 'fs/promises';
import { v4 } from 'uuid';

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id');
        const formData = await readMultipartFormData(event);

        if (!formData || formData.length === 0) {
            return {
                status: 400,
                body: 'Bad Request. Missing or empty request body'
            };
        }

        const file = formData.find((item) => item.name === 'file');
        const existingFile = (await pool.query('SELECT * FROM file WHERE id = ?', [id]))[0][0];
        const existingFilename = existingFile.filename;
        let newFilename = existingFilename;
        let report_id = formData.find((item) => item.name === 'report_id').data.toString();
        let comment_id = formData.find((item) => item.name === 'comment_id').data.toString();

        if (report_id === "") {
            report_id = existingFile.report_id;
        } else if (report_id === "null") {
            report_id = null;
        }

        if (comment_id === "") {
            comment_id = existingFile.comment_id;
        } else if (comment_id === "null") {
            comment_id = null;
        }

        if (file) {
            newFilename = v4() + '.' + file.filename.split('.').pop();
            await writeFile(`./public/files/${newFilename}`, file.data);
            await unlink(`./public/files/${existingFilename}`);
        }

        const query = `
            UPDATE file
            SET filename   = ?,
                report_id  = ?,
                comment_id = ?
            WHERE id = ?
        `;

        await pool.query(query, [newFilename, report_id, comment_id, id]);

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