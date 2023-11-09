import { IncomingMessage } from 'http';

export default async function handleRequest(req: IncomingMessage) {
    return new Promise((resolve, reject) => {
        let data = '';

        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {
            try {
                const body = JSON.parse(data);
                resolve(body);
            } catch (error) {
                reject(error);
            }
        });

        req.on('error', error => {
            reject(error);
        });
    });
}