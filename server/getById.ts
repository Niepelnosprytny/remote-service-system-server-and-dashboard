import pool from './mysql';

const getById = (tableName: string) =>
    defineEventHandler(async (event) => {
        try {
            const id = getRouterParam(event, 'id');

            const query = `SELECT * FROM ${tableName} WHERE id = ?`;

            const results: any = await pool.query(query, [id]);

            if (results[0].length === 0) {
                return {
                    status: 404,
                    body: `${tableName} with id ${id} not found`
                };
            }

            return {
                status: 200,
                body: results[0][0]
            };
        } catch (error) {
            console.error(`Error executing query for ${tableName} by ID:`, error);
            return {
                status: 500,
                body: `Internal Server Error - ${error.message}`
            };
        }
    });

export default getById;