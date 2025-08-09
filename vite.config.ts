import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // .env.local ファイルから環境変数を読み込む
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'https://newsapi.org',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          // NewsAPIが必要とするヘッダー情報を追加
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              // 読み込んだ環境変数からAPIキーを設定する
              proxyReq.setHeader('x-api-key', env.VITE_NEWS_API_KEY);
            });
          },
        },
      }
    }
  }
})