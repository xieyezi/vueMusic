// vue.config.js
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    // 选项...,
    baseUrl: './',
    devServer: {
        port: 8080, // 端口号
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        proxy: {
            '/api': {
                target: 'http://101.132.151.100:3000',//后端接口地址
                // target: 'http://localhost:3000',//后端接口地址
                ws: true,
                changeOrigin: true,//是否允许跨域
                pathRewrite: {
                    '^/api': ''   //直接用'api/接口名'进行请求.
                }
            }
        }  // 配置多个代理
    },
    chainWebpack: (config) => {
        //配置别名
        config
            .resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('views', resolve('src/views'))
            .set('common', resolve('src/common'));
    },
    //取消打包244kb警告
    configureWebpack: {
        performance: {

            hints:false

        }
    }
};