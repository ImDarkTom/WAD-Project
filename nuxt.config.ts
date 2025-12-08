import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['nuxt-mongoose'],
    mongoose: {
        uri: 'mongodb://localhost:27017/WADReviews',
        options: {},
        modelsDir: 'models',
        devtools: true
    },
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },
    css: ['~/assets/css/main.css']
})