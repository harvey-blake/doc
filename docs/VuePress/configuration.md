# 配置

## 配置文件

VuePress 站点的基本配置文件是 `.vuepress/config.js` ，但也同样支持 TypeScript 配置文件。你可以使用 `.vuepress/config.ts` 来得到更好的类型提示。

具体而言，我们对于配置文件的路径有着约定（按照优先顺序）：

- 当前工作目录 `cwd` 下：
  - `vuepress.config.ts`
  - `vuepress.config.js`
  - `vuepress.config.mjs`
- 源文件目录 `sourceDir` 下：
  - `.vuepress/config.ts`
  - `.vuepress/config.js`
  - `.vuepress/config.mjs`



```bash
vuepress dev docs --config my-config.ts
```

一个基础的配置文件是这样的：

```ts
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme(),

  lang: 'zh-CN',
  title: '你好， VuePress ！',
  description: '这是我的第一个 VuePress 站点',
})
```



## 客户端配置文件

在大多数情况下，配置文件已经足够帮助你配置好你的 VuePress 站点。不过，有些时候用户们可能希望直接添加一些客户端代码。 VuePress 通过客户端配置文件来支持这种需求：

```
├─ docs
│  ├─ .vuepress
│  │  ├─ client.js   <--- 客户端配置文件
│  │  └─ config.js   <--- 配置文件
│  └─ README.md
├─ .gitignore
└─ package.json
```

同样的，我们也有关于客户端配置文件的路径约定（按照优先顺序）：

- 当前工作目录 `cwd` 下：
  - `vuepress.client.ts`
  - `vuepress.client.js`
  - `vuepress.client.mjs`
- 源文件目录 `sourceDir` 下：
  - `.vuepress/client.ts`
  - `.vuepress/client.js`
  - `.vuepress/client.mjs`

一个基础的客户端配置文件是这样的：

```ts
import { defineClientConfig } from 'vuepress/client'

export default defineClientConfig({
  enhance({ app, router, siteData }) {},
  setup() {},
  rootComponents: [],
})
```

::: tip
和配置文件不同，客户端配置文件不能通过命令行接口的选项来指定。

:::
