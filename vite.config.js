import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  return defineConfig({
    base: command === 'build' ? '/meinPortfolio/' : '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  })
})