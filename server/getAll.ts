import pool from './mysql';

const getAll = (tableName: string) =>
    defineEventHandler(async () => {
        try {
            const query = `SELECT *FROM ${tableName}`;

            const results = await pool.query(query);

            return {
                status: 200,
                body: results[0]
            };
        } catch (error) {
            return {
                status: 500,
                body: `Internal Server Error - ${error.message}`
            };
        }
    });

export default getAll;