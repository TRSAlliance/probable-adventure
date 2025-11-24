import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        ghostshift: './TRSAlliance_Modular_Site/ghostshift/index.html',
        tracker: './TRSAlliance_Modular_Site/ghostshift/tracker.html',
        pilot: './TRSAlliance_Modular_Site/pilot-ops/index.html',
        feedback: './TRSAlliance_Modular_Site/feedback/index.html'
      }
    }
  },
  server: {
    port: 3000
  }
})
