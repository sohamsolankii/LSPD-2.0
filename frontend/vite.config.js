import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/api/v1': {
                target: 'http://localhost:8000/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
            },
        },
    },
    build: {
        outDir: 'build', // Change the output directory to 'build'
    },
    plugins: [react()],
})
