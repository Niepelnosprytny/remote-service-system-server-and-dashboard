import pool from '~/server/mysql';
import { writeFile } from 'fs/promises';
import { v4 } from 'uuid';
import * as fileType from 'file-type';
import { optimizeImageBuffer, optimizeVideoBuffer } from "~/server/fileUtils";

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
                const filename = v4() + '.' + item.filename.split('.').pop();
                const report_id = parseInt(formData.find((item) => item.name === 'report_id').data.toString()) || null;
                const comment_id = parseInt(formData.find((item) => item.name === 'comment_id').data.toString()) || null;
                const filetype = await getFileType(item);

                const query = 'INSERT INTO file (filename, report_id, comment_id, filetype) VALUES (?, ?, ?, ?)';
                const results = await pool.query(query, [filename, report_id, comment_id, filetype]);

                IDs.push(results[0].insertId)
                await writeFile(`./public/files/${filename}`, item.data);
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

async function getFileType(buffer) {
    const type = await fileType.fileTypeFromBuffer(buffer.data);
    if (type) {
        const mime = type.mime.split('/')[0];

        console.log(mime);

        if(mime === 'image') {
            console.log("started image");
            const result = await optimizeImageBuffer(buffer.buffer);
            console.log(`Image result: ${result}`);
        }

        if(mime === 'video') {
            console.log("started video");
            const result = await optimizeVideoBuffer(buffer);
            console.log(`Video result: ${result}`);
        }

        if (['image', 'document', 'video'].includes(mime)) {
            return mime;
        }
    }

    return 'document';
}