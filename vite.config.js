import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression2';

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
      // Compression gzip et brotli pour production
      ...(isProduction
        ? [
            viteCompression({
              algorithm: 'gzip',
              threshold: 512,
              exclude: [/\.(br)$/, /\.(gz)$/], // Éviter la double compression
            }),
            viteCompression({
              algorithm: 'brotliCompress',
              threshold: 512,
              exclude: [/\.(br)$/, /\.(gz)$/], // Éviter la double compression
            }),
          ]
        : []),
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
      sourcemap: false, // Désactivé pour réduire la taille du bundle
      minify: isProduction ? 'terser' : false, // Utiliser terser pour meilleure compression

      // Optimisations de chunks
      rollupOptions: {
        output: {
          // Séparation des chunks pour optimiser le cache et réduire les ressources inutilisées
          manualChunks(id) {
            // Vendor chunks séparés pour meilleur caching
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              if (id.includes('react-router')) {
                return 'vendor-router';
              }
              if (id.includes('framer-motion')) {
                return 'vendor-motion';
              }
              if (id.includes('i18next') || id.includes('react-i18next')) {
                return 'vendor-i18n';
              }
              if (id.includes('react-icons')) {
                return 'vendor-icons';
              }
              // Autres node_modules ensemble
              return 'vendor';
            }
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
      chunkSizeWarningLimit: 500, // Plus strict pour éviter les gros chunks

      // Configuration CSS
      cssCodeSplit: true,

      // Optimisations d'assets - augmenter pour plus d'inline
      assetsInlineLimit: 8192,
      
      // Compression améliorée
      terserOptions: isProduction ? {
        compress: {
          drop_console: true, // Supprimer console.log en production
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info'], // Supprimer ces fonctions
        },
        format: {
          comments: false, // Supprimer les commentaires
        },
      } : {},
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
