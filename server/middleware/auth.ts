import {verifyToken} from '~/server/jwtUtils';

export default defineEventHandler(async (event) => {
    const path = getRequestURL(event).pathname;

    if (path.startsWith('/api') && !path.startsWith('/api/auth')) {
        const authorizationHeader = getRequestHeaders(event).authorization;

        if (authorizationHeader) {
            const token = getRequestHeaders(event).authorization.split(' ')[1] ?? '';

            try {
                await verifyToken(token);
            } catch (error) {
                return {
                    status: 401,
                    body: 'Unauthorized'
                };
            }
        } else {
            return {
                status: 401,
                body: 'Missing authorization header'
            };
        }
    }
});