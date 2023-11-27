import { verifyToken } from '~/server/jwtUtils';

export default defineEventHandler(async (event) => {
    const URL = getRequestURL(event);

    if (URL.protocol === 'http') {
        URL.protocol = 'https';
        await sendRedirect(event, URL.href);
    }

    if (URL.pathname.startsWith('/api') && !URL.pathname.startsWith('/api/auth')) {
        const authorizationHeader = getRequestHeaders(event).authorization;

        if (authorizationHeader) {
            const token = getRequestHeaders(event).authorization.split(' ')[1] ?? '';

            try {
                //exp is expiration time
                //data contains bearer's ID and role
                //iat is "issued at" date
                const { exp, data, iat } = await verifyToken(token);
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