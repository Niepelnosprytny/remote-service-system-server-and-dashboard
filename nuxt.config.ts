// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';
import fs from 'fs';

export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        'nuxt-socket-io',
        '@invictus.codes/nuxt-vuetify',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
    ],
});