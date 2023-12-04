import pool from './mysql';

const deleteById = (tableName: string) =>
    defineEventHandler(async (event) => {
        try {
            const id = getRouterParam(event, 'id');

            const query = `DELETE FROM ${tableName} WHERE id = ?`;

            const results = await pool.query(query, [id]);

            if (results[0].affectedRows === 0) {
                return {
                    status: 404,
                    body: `${tableName} with id ${id} not found`
                };
            }

            return {
                status: 204,
                body: `${tableName} with id ${id} deleted successfully`
            };
        } catch (error) {
            return {
                status: 500,
                body: `Internal Server Error - ${error.message}`
            };
        }
    });

export default deleteById;