import pool from './mysql';

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
            return {
                status: 500,
                body: `Internal Server Error - ${error.message}`
            };
        }
    });

export default updateById;