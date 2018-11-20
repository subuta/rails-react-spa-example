const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')

const ROOT_PATH = path.resolve(__dirname, '../../../../')

const TEMPLATE_PATH = path.resolve(ROOT_PATH, './front/index.ejs')
const MIX_MANIFEST_PATH = path.resolve(ROOT_PATH, './public/mix-manifest.json')
const INDEX_HTML_PATH = path.resolve(ROOT_PATH, './public/index.html')

class MixHtmlPlugin {
  /**
   * Apply the plugin.
   *
   * @param {Object} compiler
   */
  apply (compiler) {
    compiler.plugin('done', (stats) => {
      const mixManifest = require(MIX_MANIFEST_PATH)

      const compilation = stats.compilation
      const chunks = compilation.chunks
      const webpackConfig = compilation.options

      const files = _.flattenDeep(_.map(chunks, (chunk) => chunk.files))
      const assets = _.transform(files, (result, file) => {
        const filePath = mixManifest[file] || file
        const filename = _.first(filePath.split('?'))
        const ext = _.trimStart(path.extname(filename), '.')
        result[ext].push(filePath)
      }, { js: [], css: [] })

      const data = {
        webpackConfig,
        assets
      }

      ejs.renderFile(TEMPLATE_PATH, data, {}, (err, html) => {
        if (err) throw new err
        fs.writeFileSync(INDEX_HTML_PATH, html, {encoding: 'utf-8'})
      })
    })
  }
}

module.exports = MixHtmlPlugin