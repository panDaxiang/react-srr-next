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

### 集成 sass

next 中默认不支持直接 import scss 文件，它默认为我们提供了一种 css in js 的方案，所以我们要自己加入 next 的插件包进行 scss 支持

```
yarn add @zeit/next-sass node-sass -D
```

如果项目根目录下没有的话
我们新建一个 next.config.js
然后加入如下代码

```
const withCss = require('@zeit/next-sass')

// withCss得到的是一个next的config配置
module.exports = withSass({})

```

### 集成 ant-design

```
yarn add antd
yarn add babel-plugin-import // 按需加载插件
```

在根目录下新建.babelrc 文件

```
{
  "presets": ["next/babel"],
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd"
      }
    ]
  ]
}

```

在 pages 文件夹下新建\_app.js，这是 next 提供的让你重写 App 组件的方式，在这里我们可以引入 antd 的样式

```
// pages/_app.js

import App from 'next/app'

import 'antd/dist/antd.css'

export default App

```
