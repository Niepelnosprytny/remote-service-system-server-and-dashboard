import pool from '~/server/mysql';
import { signToken } from "~/server/jwtUtils";
import { verifyPassword } from "~/server/passwordUtils";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body) {
            return {
                status: 400,
                body: 'Bad Request. Missing credentials'
            };
        }

        const passwordQuery = 'SELECT password, salt FROM user WHERE email = ?';

        const { password, salt } = (await pool.query(passwordQuery, [body.email]))[0][0];

        if(verifyPassword(body.password, password, salt)) {
            const query = 'SELECT id, email, name, surname, role, employer FROM user WHERE email = ? AND password = ?';

            const results = await pool.query(query, [body.email, password]);

            if (results[0].length === 0) {
                return {
                    status: 404,
                    body: 'User not found'
                };
            }

            const token = signToken({ id: results[0][0].id, role: results[0][0].role });

            return {
                status: 200,
                body: {
                    token: token,
                    user: results[0][0]
                }
            };
        } else {
            return {
                status: 401,
                body: 'Unauthorized'
            }
        }
    }
    catch(error) {
            return {
                status: 500,
                body: `Internal Server Error - ${error.message}`
            };
        }
    }
);