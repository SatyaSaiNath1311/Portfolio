import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/Portfolio/',
  plugins: [
    tailwindcss(),
    react(),
    {
      name: 'pdf-download-headers',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (
            req.url &&
            (req.url.includes('Teeparthi_Satya_Sai_Nath_Resume.pdf') ||
              req.url.includes('resume.pdf'))
          ) {
            res.setHeader(
              'Content-Disposition',
              'attachment; filename="Teeparthi_Satya_Sai_Nath_Resume.pdf"'
            )
            res.setHeader('Content-Type', 'application/pdf')
          }
          next()
        })
      },
    },
  ],
})
