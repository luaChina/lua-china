module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Lua China - Lua 中国开发者社区',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },
      { name: 'keywords', content: 'Lua中国,Lua中文,lua中文网,lua openresty,lua nana,nana,Lua China 社区' },
      { hid: 'description', name: 'description', content: 'Lua 中国，这里是 Lua 中文网，为开发者提供学习交流的平台，Lua 中国需要你的力量！' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      { src: 'https://browser.sentry-cdn.com/4.3.4/bundle.min.js', crossorigin:'anonymous' }
    ],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios', 'vee-validate', 'vue-star'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    loaders: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        exclude: /assets\/svg/,
        options: {
          limit: 1000, // 1K limit
          name: 'img/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    { src: '~plugins/app', ssr: false },
    { src: '~plugins/vee-validate', ssr: false },
    { src: '~plugins/vue-star', ssr: false },
  ],
  css: [{
    src: '~assets/scss/app.scss', lang: 'scss',
  }],
}
