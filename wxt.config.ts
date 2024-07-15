import path from 'path';
import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: ['storage', 'contextMenus'],
    default_locale: 'en',
    action: {},
    commands: {
      "ask-to-ai": {
        "suggested_key": {
          "default": "Ctrl+Q",
          "mac": "MacCtrl+Q",
        },
        "description": "Run `Ask to AI` command with current selected range."
      }
    },
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
