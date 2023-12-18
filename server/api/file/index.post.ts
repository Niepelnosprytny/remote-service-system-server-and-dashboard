import pool from '~/server/mysql';
import { writeFile } from 'fs/promises';
import { v4 } from 'uuid';

export default defineEventHandler(async (event) => {
    try {
        const formData = await readMultipartFormData(event);

        if (!formData || formData.length === 0) {
            return {
                status: 400,
                body: 'Bad Request. Missing or empty request body'
            };
        }

        const insertPromises = formData.map(async (item) => {
            if (item.name === 'file') {
                const filename = v4() + '.' + item.filename.split('.').pop();
                const report_id = parseInt(formData.find((item) => item.name === 'report_id').data.toString()) || null;
                const comment_id = parseInt(formData.find((item) => item.name === 'comment_id').data.toString()) || null;
                const filetype = formData.find((item) => item.name === 'filetype').data.toString();

                const query = 'INSERT INTO file (filename, report_id, comment_id, filetype) VALUES (?, ?, ?, ?)';

                await pool.query(query, [filename, report_id, comment_id]);
                await writeFile(`./public/files/${filename}`, item.data);
            }
        });

        await Promise.all(insertPromises);

        return {
            status: 201,
            body: 'Files created successfully'
        };
    } catch (error) {
        return {
            status: 500,
            body: `Internal Server Error - ${error.message}`
        };
    }
});