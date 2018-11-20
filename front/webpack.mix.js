const mix = require('laravel-mix')
const tailwindcss = require('tailwindcss')

// Load custom html plugin for generate index.html.
const MixHtmlPlugin = require('./src/utils/webpack/mixHtmlPlugin')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.setPublicPath('public')
  .react('front/src/index.js', 'public/js')
  .postCss('front/index.css', 'public/css')
  .options({
    processCssUrls: false,
    postCss: [tailwindcss(path.resolve(__dirname, './tailwind.js'))]
  })
  .babelConfig({
    plugins: [
      'react-hot-loader/babel',
      'transform-class-properties'
    ]
  })
  .webpackConfig(webpack => ({
    resolve: {
      modules: [
        path.resolve(__dirname, '../node_modules'),
        // SEE: https://stackoverflow.com/questions/27502608/resolving-require-paths-with-webpack/36574982#36574982
        '.'
      ]
    },

    plugins: [
      new MixHtmlPlugin()
    ]
  }))

if (process.env.NODE_ENV === 'production') {
  mix.version()
}