const pkg = require("./package");

module.exports = {
    /*
     ** Headers of the page
     */
    head: {
        title: "Lua 社区",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content:
                    "width=device-width, initial-scale=1.0, user-scalable=no"
            },
            {
                hid: "description",
                name: "description",
                content:
                    "Lua 论坛，Lua Forum为开发者提供学习交流的平台，Lua 开发，Openresty社区，Openresty框架，逆向分析社区，逆向分析工具，逆向工程，游戏逆向,OpenResty community,Reverse engineering,Game reverse engineering"
            }
        ],
        link: [
            {
                rel: 'stylesheet',
                href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css',
                crossorigin: 'anonymous'
            }
        ],
        script: [
            {
                src: "https://hm.baidu.com/hm.js?2a5e5c294d65229d5d15f0fd23477870",
                async: true
            }
        ]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: {
        color: "#41B883",
        height: "3px"
    },

    /*
     ** Global CSS
     */
    css: [
        "@/assets/sass/app.scss",
    ],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: "~plugins/app", ssr: false },
        { src: "~plugins/vee-validate", ssr: false }
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [],

    buildModules: [
        '@nuxtjs/tailwindcss'
    ],

    /*
     ** Server middleware
     */
    serverMiddleware: [
        '~/server/middleware/redirect-www.js'
    ],

    /*
     ** Build configuration
     */
    build: {
        publicPath: 'https://lua-china-1256147061.cos.accelerate.tencentcos.cn/_nuxt/',
        postcss: {
            plugins: {
                'postcss-custom-properties': false
            }
        },
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) { },
        extractCSS: true,
        optimization: {
            splitChunks: {
                chunks: 'all',
                automaticNameDelimiter: '.',
                name: undefined,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
        }
    }
};

