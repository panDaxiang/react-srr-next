const Koa = require('koa')
// const Router = require('koa-router')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const PORT = 3000

app.prepare().then(() => {
  const server = new Koa()
  // const router = new Router()

  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.listen(PORT, () => {
    console.log(`koa server listen on ${PORT}`)
  })
})
