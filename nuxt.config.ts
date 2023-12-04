// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';
import fs from 'fs';

export default defineNuxtConfig({
    devtools: { enabled: true },
    server: {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'ssl', 'key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, 'ssl', 'cert.pem'))
        }
    },
    modules: [
        '@invictus.codes/nuxt-vuetify',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
    ],
});