const mix = require('laravel-mix')
const tailwindcss = require('tailwindcss')

// Load custom html plugin for generate index.html.
const MixHtmlPlugin = require('./utils/webpack/mixHtmlPlugin')

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
  .webpackConfig(webpack => ({
    plugins: [
      new MixHtmlPlugin()
    ]
  }))

if (process.env.NODE_ENV === 'production') {
  mix.version()
}