const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: false,
  productionSourceMap: false,
  lintOnSave: false,
  chainWebpack: (config) => {
    config.optimization.minimizer('terser').tap((args) => {
      args[0].parallel = false
      return args
    })
  },
  devServer: {
    client: {
      overlay: {
        runtimeErrors: (error) => {
          if (error.message === 'ResizeObserver loop completed with undelivered notifications.') {
            return false
          }
          return true
        }
      }
    }
  }
})
