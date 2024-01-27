// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        'nuxt-socket-io',
        '@invictus.codes/nuxt-vuetify',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt'
    ],
});
