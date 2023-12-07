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

                console.log(`File: ${Object.keys(item)}`);
                console.log(`Filename: ${filename}`);
                console.log(`Report ID: ${report_id}`);
                console.log(`Comment ID: ${comment_id}`);

                const query = 'INSERT INTO file (filename, report_id, comment_id) VALUES (?, ?, ?)';

                await pool.query(query, [filename, report_id, comment_id]);
                await writeFile(`./files/${filename}`, item.data);
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