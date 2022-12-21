/**
 * Copyright 2022 Design Barn Inc.
 */

const path = require('path');

const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const Dotenv = require('dotenv-webpack');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  ...defaultConfig,
  plugins: [...defaultConfig.plugins, new Dotenv()],
  resolve: {
    ...defaultConfig.resolve,
    alias: {
      ...defaultConfig.resolve.alias,
      react: require.resolve('react'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@host': path.resolve(__dirname, 'src/host'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
    },
    fallback: {
      https: false,
      http: false,
      url: false,
    },
  },
  module: {
    ...defaultConfig.module,
    rules: [
      ...defaultConfig.module.rules,
      {
        // eslint-disable-next-line require-unicode-regexp
        test: /\.css$/,
        // use: ['style-loader', 'css-loader'],
      },
    ],
  },
  // Application entry points
  entry: {
    ...defaultConfig.entry,
    'lottiefiles-admin-settings-page': path.join(__dirname, 'src/admin/settings', 'index.tsx'),
    'lottiefiles-admin-settings-page-style': path.join(__dirname, 'src/admin/settings', 'style.ts'),
    'lottiefiles-interactivity': path.join(__dirname, 'src/scripts', 'lottie-interactivity.min.js'),
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './build'),
  },
};
