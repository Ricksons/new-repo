const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true,
    bonjour: true,
    allowedHosts: 'all',
    port: '7101',    
    hot: false,
    liveReload: true,
    webSocketServer: 'ws',
  },
  configureWebpack: {
    watchOptions: {
      poll: 500,
      aggregateTimeout: 300,
    }
  }
})
 