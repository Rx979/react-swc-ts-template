import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ react() ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  build: {
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return id.split('node_modules/')[2].split('/')[0];
          } else if (id.includes('/src/pages/')) {
            // 针对 pages 目录，按页面拆包
            const pageName = id.split('/src/pages/')[1].split('/')[0];
            return `page-${pageName}`;
          }
          return 'app'; // 默认应用代码打包在一起
        },
        // 定义入口文件的命名规则
        entryFileNames: 'js/[name].[hash].js',
        // 定义代码分片文件的命名规则
        chunkFileNames: 'js/[name].[hash].js',
        // 定义静态资源文件的命名规则
        assetFileNames: '[ext]/[name].[hash].[ext]',
      }
    }
  }
});
