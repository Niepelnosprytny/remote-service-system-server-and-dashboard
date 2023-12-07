import pool from './mysql';

const createItem = (tableName: string) =>
    defineEventHandler(async (event) => {
        try {
            const body = await readBody(event);

            if (!body) {
                return {
                    status: 400,
                    body: 'Bad Request. Missing request body'
                };
            }

            const fields = Object.keys(body);
            const values = Object.values(body);

            const query = `INSERT INTO ${tableName} (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')})`;

            await pool.query(query, values);

            return {
                status: 201,
                body: `${tableName} created successfully`
            };
        } catch (error) {
            return {
                status: 500,
                body: `Internal Server Error - ${error.message}`
            };
        }
    });

export default createItem;