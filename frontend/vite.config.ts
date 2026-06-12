import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//new config
export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: 3003,
    allowedHosts: [
      'thehappyfoodcompany.com',
      'www.thehappyfoodcompany.com'
    ]
  }
})

