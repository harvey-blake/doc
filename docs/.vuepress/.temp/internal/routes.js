export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/www/doc/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Home"} }],
  ["/VuePress/configuration.html", { loader: () => import(/* webpackChunkName: "VuePress_configuration.html" */"E:/www/doc/docs/.vuepress/.temp/pages/VuePress/configuration.html.js"), meta: {"title":"配置"} }],
  ["/VuePress/getting-started.html", { loader: () => import(/* webpackChunkName: "VuePress_getting-started.html" */"E:/www/doc/docs/.vuepress/.temp/pages/VuePress/getting-started.html.js"), meta: {"title":"快速上手"} }],
  ["/VuePress/page.html", { loader: () => import(/* webpackChunkName: "VuePress_page.html" */"E:/www/doc/docs/.vuepress/.temp/pages/VuePress/page.html.js"), meta: {"title":"页面"} }],
  ["/VuePress/VuePress1.html", { loader: () => import(/* webpackChunkName: "VuePress_VuePress1.html" */"E:/www/doc/docs/.vuepress/.temp/pages/VuePress/VuePress1.html.js"), meta: {"title":"Markdown基本语法"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"E:/www/doc/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);
