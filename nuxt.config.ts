// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';
import fs from 'fs';

export default defineNuxtConfig({
    devtools: {enabled: true},
    server: {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'ssl', 'key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, 'ssl', 'cert.pem'))
        }
    },
    modules: [
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
    ],
    auth: {
        strategies: {
            local: {
                token: {
                    property: 'token',
                    global: true
                },
                user: {
                    property: 'user'
                },
                endpoints: {
                    login: {url: '/api/auth/login', method: 'post'},
                    logout: {url: '/api/auth/logout', method: 'post'},
                    user: {url: '/api/user', method: 'get'}
                }
            }
        }
    }
});