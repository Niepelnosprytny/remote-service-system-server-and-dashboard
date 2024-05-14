// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@vueuse/nuxt',
        'nuxt-socket-io',
        '@invictus.codes/nuxt-vuetify',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        "nuxt-mail"
    ],
    nitro: {
        experimental: {
            websocket: true
        }
    },
    mail: {
        message: {
          to: process.env.ADMIN_EMAIL
        },
        smtp: {
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.APP_SPECIFIC_PASSWORD
            }
        }
    }
});