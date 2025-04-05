const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    autoprefixer,
    tailwindcss,
    cssnano,
  ]
};
