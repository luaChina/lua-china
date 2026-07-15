const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const app = new Koa()

// Keep the process alive on stray async errors. Without these, an unhandled
// promise rejection during SSR would crash the whole Node process (Node's
// default behaviour), dropping every in-flight connection at once — which
// shows up as site-wide connection timeouts. Log loudly instead of dying.
process.on('unhandledRejection', (reason) => {
  consola.error('[unhandledRejection]', reason)
})
process.on('uncaughtException', (err) => {
  consola.error('[uncaughtException]', err)
})

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  
  // use kong proxy
  app.proxy = true
  
  app.use(async ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    try {
      // nuxt.render returns a promise that rejects if SSR blows up before it
      // can send a response. Catch it so a single bad render can't leave the
      // client hanging (→ connection timeout) or bubble up as a crash.
      await nuxt.render(ctx.req, ctx.res)
    } catch (err) {
      consola.error('[nuxt.render]', err)
      if (!ctx.res.headersSent) {
        ctx.res.statusCode = 500
        ctx.res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        ctx.res.end('服务器繁忙，请稍后再试')
      }
    }
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start().catch((err) => {
  consola.error('[start]', err)
  process.exit(1)
})
