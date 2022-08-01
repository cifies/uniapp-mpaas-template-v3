import { defineConfig } from "vite"
import { resolve } from 'path'
import uni from "@dcloudio/vite-plugin-uni"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
    ],
  }
})
