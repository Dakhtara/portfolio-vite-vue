import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {VitePWA} from 'vite-plugin-pwa'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        svgLoader(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,jpg,svg,webp,woff2,woff}']
            }
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    three: ['three'],
                    gsap: ['gsap']
                }
            }
        }
    }
})
