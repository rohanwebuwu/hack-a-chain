/**
 * Copyright 2022 Design Barn Inc.
 */

const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [tailwindcss('./tailwind.config.js'), require('autoprefixer')],
};
