const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // パスのルートを相対パスにする
  publicPath: "./"
})
