import path from 'path';
import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: ['storage', 'contextMenus'],
    default_locale: 'en',
  },
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
  })
});
