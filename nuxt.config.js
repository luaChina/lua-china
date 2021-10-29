const pkg = require('./package');


module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: 'Lua China - Lua 中国开发者社区',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no'},
            {name: 'keywords', content: 'Lua中国,Lua论坛,openresty论坛,lua社区,luachina,lua china,lua openresty,lua nana api 框架,nana,Lua China 社区'},
            {hid: 'description', name: 'description', content: 'Lua 中国，这里是 Lua 论坛，为开发者提供学习交流的平台，Lua 中国需要你的力量！'}
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
        ],
        script: [
            { src: 'https://lua-china-1256147061.file.myqcloud.com/static/js/sentry.min.js', crossorigin: 'anonymous'},
            { src: 'https://lua-china-1256147061.file.myqcloud.com/static/js/highlight.min.js', crossorigin: 'anonymous'},
            { src: 'https://lua-china-1256147061.file.myqcloud.com/static/js/lua.min.js', crossorigin: 'anonymous'},
        ],
    },

    /*
    ** Customize the progress-bar color
    */
    loading: {
        color: '#41B883',
        height: '3px'
    },

    /*
    ** Global CSS
    */
    css: ['@/assets/sass/app.scss'],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        {src: '~plugins/app', ssr: false},
        {src: '~plugins/vee-validate', ssr: false},
        {src: '~plugins/vue-star', ssr: false},
        {src: '~plugins/markdown-editor', ssr: false},
        {src: '~plugins/fontawesome', ssr: true}
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
       
    ],

    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {

        },
        extractCSS: true
    }
};
