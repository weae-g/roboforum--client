// FILE: vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import { fileURLToPath, URL } from 'url';

const createAlias = (path) => fileURLToPath(new URL(path, import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass',
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: createAlias('./src') },
      { find: '@assets', replacement: createAlias('./src/shared/assets') },
      { find: '@http', replacement: createAlias('./src/http') },
      { find: '@ui', replacement: createAlias('./src/ui') },
      { find: '@store', replacement: createAlias('./src/store') },
      { find: '@router', replacement: createAlias('./src/router') },
      { find: '@pages', replacement: createAlias('./src/pages') },
      { find: '@components', replacement: createAlias('./src/components') },
      { find: '@layouts', replacement: createAlias('./src/layouts') },
    ],
  },
});
