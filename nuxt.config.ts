// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';

export default defineNuxtConfig({
  devtools: { enabled: true },
  server: {
    https: {
      key: path.resolve(__dirname, 'key.pem'),
      cert: path.resolve(__dirname, 'cert.pem')
    }
  }
});