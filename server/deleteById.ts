import pool from './mysql';

const deleteById = (tableName: string) =>
    defineEventHandler(async (event) => {
        try {
            const id = getRouterParam(event, 'id');
            const results = await pool.query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);

            if (results[0].affectedRows === 0) {
                return {
                    status: 404,
                    body: { error: `${tableName} not found` }
                };
            }

            return {
                status: 204
            };
        } catch (error) {
            console.error(`Error deleting ${tableName}:`, error);
            return {
                status: 500,
                body: { error: `Internal Server Error - ${error.message}` }
            };
        }
    });

export default deleteById;