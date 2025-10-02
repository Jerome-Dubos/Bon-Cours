import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = command === 'build';
  const isAnalyze = mode === 'analyze';

  return {
    plugins: [
      react({
        // Optimisations React
        fastRefresh: true,
        babel: {
          plugins: [
            // Optimisations Babel pour la production
            ...(isProduction
              ? [['babel-plugin-react-remove-properties', { properties: ['data-testid'] }]]
              : []),
          ],
        },
      }),
    ],

    // Configuration du serveur de développement
    server: {
      host: true,
      port: 3000,
      open: true,
      cors: true,
      hmr: {
        overlay: true,
      },
    },

    // Configuration du preview
    preview: {
      host: true,
      port: 4173,
      open: true,
    },

    // Optimisations de build
    build: {
      target: 'esnext',
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: !isProduction,
      minify: isProduction ? 'esbuild' : false,

      // Optimisations de chunks
      rollupOptions: {
        output: {
          // Séparation des chunks pour optimiser le cache
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            motion: ['framer-motion'],
            i18n: ['i18next', 'react-i18next'],
            icons: ['react-icons'],
          },
          // Optimisation des noms de fichiers
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: assetInfo => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
              return `assets/images/[name]-[hash].${ext}`;
            }
            if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
              return `assets/fonts/[name]-[hash].${ext}`;
            }
            return `assets/[name]-[hash].${ext}`;
          },
        },
      },

      // Optimisations de taille
      chunkSizeWarningLimit: 1000,

      // Configuration CSS
      cssCodeSplit: true,

      // Optimisations d'assets
      assetsInlineLimit: 4096,
    },

    // Résolution des modules
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@pages': resolve(__dirname, 'src/pages'),
        '@assets': resolve(__dirname, 'src/assets'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@hooks': resolve(__dirname, 'src/hooks'),
        '@context': resolve(__dirname, 'src/context'),
        '@services': resolve(__dirname, 'src/services'),
        '@config': resolve(__dirname, 'src/config'),
        '@i18n': resolve(__dirname, 'src/i18n'),
      },
    },

    // Configuration CSS
    css: {
      devSourcemap: !isProduction,
      postcss: {
        plugins: [
          // Plugins PostCSS peuvent être ajoutés ici
        ],
      },
    },

    // Variables d'environnement
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },

    // Optimisations d'assets
    assetsInclude: ['**/*.webp', '**/*.avif'],

    // Configuration des dépendances
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'framer-motion',
        'i18next',
        'react-i18next',
        'react-icons',
      ],
      exclude: ['@vite/client', '@vite/env'],
    },

    // Configuration des preloads et modules
    experimental: {
      renderBuiltUrl(filename, { hostType }) {
        if (hostType === 'js') {
          return { js: `/${filename}` };
        } else {
          return { relative: true };
        }
      },
    },

    // Configuration pour l'analyse de bundle
    ...(isAnalyze && {
      plugins: [...(isAnalyze ? [require('vite-bundle-analyzer')()] : [])],
    }),
  };
});
