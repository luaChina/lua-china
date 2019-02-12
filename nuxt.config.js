const pkg = require('./package');


module.exports = {
    mode: 'spa',

    /*
    ** Headers of the page
    */
    head: {
        title: 'Lua China - Lua 中国开发者社区',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no'},
            {name: 'keywords', content: 'Lua中国,Lua中文,lua中文网,lua openresty,lua nana,nana,Lua China 社区'},
            {hid: 'description', name: 'description', content: 'Lua 中国，这里是 Lua 中文网，为开发者提供学习交流的平台，Lua 中国需要你的力量！'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
        ],
        script: [
            {src: 'https://browser.sentry-cdn.com/4.3.4/bundle.min.js', crossorigin: 'anonymous'}
        ],
    },

    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#fff'},

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
        {src: '~plugins/fontawesome', ssr: true}
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://bootstrap-vue.js.org/docs/
        'bootstrap-vue/nuxt'
    ],

    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {

        }
    }
};
