[参考文章](https://juejin.im/post/5d5a54f0e51d4561af16dd19)

## 使用 next 实现 react ssr

### 项目的初始化

- npm i -g create-next-app
- create-next-app next-github
- cd next-github
- npm run dev

### 把 next 作为 Koa 的中间件使用。（可选）

在根目录新建 server.js 文件

```
// server.js

const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const PORT = 3001
// 等到pages目录编译完成后启动服务响应请求
app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.listen(PORT, () => {
    console.log(`koa server listening on ${PORT}`)
  })
})

```

然后把 package.json 中的 dev 命令改掉

```
scripts": {
  "dev": "node server.js",
  "build": "next build",
  "start": "next start"
}

```
