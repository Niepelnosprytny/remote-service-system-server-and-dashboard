import pool from '~/server/mysql';
import { signToken } from '~/server/jwtUtils';
import { hashPassword } from "~/server/passwordUtils";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body) {
            return {
                status: 400,
                body: 'Bad Request. Missing request body'
            };
        }


        const { hash, salt } = hashPassword(body.password);

        const query = `INSERT INTO user (email, password, salt, name, surname, role, employer) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const results = await pool.query(query, [body.email, hash, salt, body.name, body.surname, body.role, body.employer]);

        const token = signToken({ id: results[0]?.insertId, role: body.role });

        return {
            status: 201,
            body: {
                token: token,
                user: { id: results[0]?.insertId, ...body }
            },
        };
    } catch (error) {
        return {
            status: 500,
            body: `Internal Server Error - ${error.message}`
        };
    }
});