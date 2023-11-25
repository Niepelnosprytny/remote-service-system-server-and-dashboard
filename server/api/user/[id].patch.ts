import pool from '~/server/mysql';
import { hashPassword } from "~/server/passwordUtils";

export default defineEventHandler(async (event) => {
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

        if (fields.includes('password')) {
            const { hash, salt } = hashPassword(body.password);
            values = values
                .map((value, index) => (fields[index] === 'password' ? hash : value))
                .map((value, index) => (fields[index] === 'salt' ? salt : value));
        }

        const setPart = fields.map((field) => `${field} = ?`).join(', ');
        const query = `UPDATE user
                       SET ${setPart}
                       WHERE id = ?`;

        const results = await pool.query(query, [...values, id]);

        if (results[0].affectedRows === 0) {
            return {
                status: 404,
                body: `user with id ${id} not found`
            };
        }

        return {
            status: 200,
            body: `user with id ${id} updated successfully`
        };
    } catch (error) {
        return {
            status: 500,
            body: `Internal Server Error - ${error.message}`
        };
    }
});