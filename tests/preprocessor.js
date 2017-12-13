'use strict'

const tsc = require('typescript')
const {compilerOptions} = require('../tsconfig')

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts')) {
      return tsc.transpile(
        src,
        Object.assign({}, compilerOptions, {sourceMap: false, inlineSourceMap: true}),
        path,
        []
      )
    }
    return src
  }
}
