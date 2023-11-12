import pool from './mysql';

const getAll = (tableName: string) =>
    defineEventHandler(async () => {
        try {
            const results = await pool.query(`SELECT *
                                              FROM ${tableName}`);

            return {
                status: 200,
                body: {data: results[0]}
            };
        } catch (error) {
            console.error(`Error executing query for ${tableName}:`, error);
            return {
                status: 500,
                body: {error: `Internal Server Error - ${error.message}`},
            };
        }
    });

export default getAll;