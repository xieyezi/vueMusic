// vue.config.js
module.exports = {
    // 选项...
    baseUrl: '/',
    devServer: {
        port: 8080, // 端口号
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        proxy: {
            '/api': {
                target: 'http://localhost:3000/',//后端接口地址
                ws: true,
                changeOrigin: true//是否允许跨域
            }
        }  // 配置多个代理
    }
}