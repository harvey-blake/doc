export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/www/doc/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Home"} }],
  ["/ethers/hello.html", { loader: () => import(/* webpackChunkName: "ethers_hello.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/hello.html.js"), meta: {"title":"HelloVitalik (6行代码)"} }],
  ["/ethers/Provider.html", { loader: () => import(/* webpackChunkName: "ethers_Provider.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/Provider.html.js"), meta: {"title":"Provider 提供器"} }],
  ["/ethers/ReadContract.html", { loader: () => import(/* webpackChunkName: "ethers_ReadContract.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/ReadContract.html.js"), meta: {"title":"读取合约信息"} }],
  ["/ethers/SendETH.html", { loader: () => import(/* webpackChunkName: "ethers_SendETH.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/SendETH.html.js"), meta: {"title":"发送ETH"} }],
  ["/ethers/WriteContract.html", { loader: () => import(/* webpackChunkName: "ethers_WriteContract.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/WriteContract.html.js"), meta: {"title":"合约交互"} }],
  ["/VuePress/configuration.html", { loader: () => import(/* webpackChunkName: "VuePress_configuration.html" */"E:/www/doc/docs/.vuepress/.temp/pages/VuePress/configuration.html.js"), meta: {"title":"配置"} }],
  ["/VuePress/getting-started.html", { loader: () => import(/* webpackChunkName: "VuePress_getting-started.html" */"E:/www/doc/docs/.vuepress/.temp/pages/VuePress/getting-started.html.js"), meta: {"title":"快速上手"} }],
  ["/VuePress/page.html", { loader: () => import(/* webpackChunkName: "VuePress_page.html" */"E:/www/doc/docs/.vuepress/.temp/pages/VuePress/page.html.js"), meta: {"title":"页面"} }],
  ["/VuePress/VuePress1.html", { loader: () => import(/* webpackChunkName: "VuePress_VuePress1.html" */"E:/www/doc/docs/.vuepress/.temp/pages/VuePress/VuePress1.html.js"), meta: {"title":"Markdown基本语法"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"E:/www/doc/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
