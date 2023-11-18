import pool from './mysql';
import crypto from 'crypto';

const updateById = (tableName: string) =>
    defineEventHandler(async (event) => {
        try {
            const id = getRouterParam(event, 'id');
            const body = await readBody(event);

            if (!body) {
                return {
                    status: 400,
                    body: 'Bad Request. Missing request body'
                };
            }

            const fields = Object.keys(body);
            let values = Object.values(body);

            if (tableName === 'user' && fields.includes('password')) {
                const hashedPassword = crypto.createHash('sha256').update(body.password).digest('hex');
                values = values.map((value, index) => (fields[index] === 'password' ? hashedPassword : value));
            }

            const setPart = fields.map((field) => `${field} = ?`).join(', ');
            const query = `UPDATE ${tableName} SET ${setPart} WHERE id = ?`;

            const results = await pool.query(query, [...values, id]);

            if (results[0].affectedRows === 0) {
                return {
                    status: 404,
                    body: `${tableName} with id ${id} not found`
                };
            }

            return {
                status: 200,
                body: `${tableName} with id ${id} updated successfully`
            };
        } catch (error) {
            console.error(`Error executing update for ${tableName}:`, error);
            return {
                status: 500,
                body: `Internal Server Error - ${error.message}`
            };
        }
    });

export default updateById;