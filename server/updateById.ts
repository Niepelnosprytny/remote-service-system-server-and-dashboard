import pool from './mysql';
import handleRequest from './handleRequest';
import crypto from 'crypto';

const updateById = (tableName: string) =>
    defineEventHandler(async (event) => {
        try {
            const id = getRouterParam(event, 'id');
            const body = await handleRequest(event.node.req);

            if (!body[tableName]) {
                return {
                    status: 400,
                    body: { error: `Bad Request. Missing ${tableName} data in the request body.` }
                };
            }

            const fields = Object.keys(body[tableName]);
            let values = Object.values(body[tableName]);

            if (tableName === 'user' && fields.includes('password')) {
                const hashedPassword = crypto.createHash('sha256').update(body[tableName].password).digest('hex');
                values = values.map((value, index) => (fields[index] === 'password' ? hashedPassword : value));
            }

            const setPart = fields.map((field) => `${field} = ?`).join(', ');

            const query = `UPDATE ${tableName} SET ${setPart} WHERE id = ?`;

            const results = await pool.query(query, [...values, id]);

            if (results[0].affectedRows === 0) {
                return {
                    status: 404,
                    body: { error: `${tableName} not found` }
                };
            }

            return {
                status: 200,
                body: { data: results[0] }
            };
        } catch (error) {
            console.error(`Error executing update for ${tableName}:`, error);
            return {
                status: 500,
                body: { error: `Internal Server Error - ${error.message}` }
            };
        }
    });

export default updateById;