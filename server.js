/* eslint no-console: 0 */
const path = require('path');
const webpack = require('webpack');
const browserSync = require('browser-sync');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');

const bundler = webpack(webpackConfig);

/**
 * Run Browsersync and use middleware for Hot Module Replacement
 */
browserSync({
  server: {
    baseDir: 'dist',
    middleware: [
      webpackDevMiddleware(bundler, {
        // IMPORTANT: dev middleware can't access config, so we should
        // provide publicPath by ourselves
        publicPath: webpackConfig.output.publicPath,
        stats: {
          colors: true
        },
        // for other settings, see http://webpack.github.io/docs/webpack-dev-middleware.html
      }),

      webpackHotMiddleware(bundler),
    ],
  },

  // no need to watch `*.{js, jsx}` here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    './dist/css/*.css',
    './dist/*.html',
  ],
});
