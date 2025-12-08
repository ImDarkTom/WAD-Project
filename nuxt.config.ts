import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['nuxt-mongoose', '@vee-validate/nuxt'],
    mongoose: {
        uri: 'mongodb://localhost:27017/WADReviews',
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