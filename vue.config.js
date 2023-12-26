const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy: {
      '/SSM_war_exploded': {
        // 拦截器(拦截链接中有/api)
        target: 'http://localhost:8081/',
        changeOrigin: true,	// 是否跨域
      }
    }
  }
})
