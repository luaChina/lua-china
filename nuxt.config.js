const pkg = require("./package");

module.exports = {
    /*
     ** Headers of the page
     */
    head: {
        title: "Lua China - Lua 中国开发者社区",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content:
                    "width=device-width, initial-scale=1.0, user-scalable=no"
            },
            {
                name: "keywords",
                content:
                    "Lua中国,Lua论坛,openresty论坛,lua社区,luachina,lua china,lua openresty,lua nana api 框架,nana,Lua China 社区"
            },
            {
                hid: "description",
                name: "description",
                content:
                    "Lua 中国，这里是 Lua 论坛，为开发者提供学习交流的平台，Lua 中国需要你的力量！"
            }
        ],
        link: [
            {
                rel: 'stylesheet',
                href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css',
                crossorigin: 'anonymous'
            }
        ],
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

    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {},
        extractCSS: true
    }
};
