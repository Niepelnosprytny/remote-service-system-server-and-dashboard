import handleRequest from "./handleRequest";
import pool from './mysql';
import crypto from 'crypto';

const createItem = (tableName: string) =>
    defineEventHandler(async (event) => {
        try {
            const body: any = await handleRequest(event.node.req);

            if (!body[tableName]) {
                return {
                    status: 400,
                    body: { error: `Bad Request. Missing ${tableName} data in the request body` }
                };
            }

            const fields = Object.keys(body[tableName]);
            let values = Object.values(body[tableName]);

            if (tableName === 'user' && fields.includes('password')) {
                const hashedPassword = crypto.createHash('sha256').update(body[tableName].password).digest('hex');
                values = values.map((value, index) => (fields[index] === 'password' ? hashedPassword : value));
            }

            const query = `INSERT INTO ${tableName} (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')})`;

            const results = await pool.query(query, values);

            return {
                status: 201,
                body: { data: results[0] }
            };
        } catch (error) {
            console.error(`Error executing query for ${tableName}:`, error);
            return {
                status: 500,
                body: { error: `Internal Server Error - ${error.message}` }
            };
        }
    });

export default createItem;