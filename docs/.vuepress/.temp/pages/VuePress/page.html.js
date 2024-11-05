import comp from "E:/www/doc/docs/.vuepress/.temp/pages/VuePress/page.html.vue"
const data = JSON.parse("{\"path\":\"/VuePress/page.html\",\"title\":\"页面\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"路由\",\"slug\":\"路由\",\"link\":\"#路由\",\"children\":[]},{\"level\":2,\"title\":\"Frontmatter\",\"slug\":\"frontmatter\",\"link\":\"#frontmatter\",\"children\":[]},{\"level\":2,\"title\":\"内容\",\"slug\":\"内容\",\"link\":\"#内容\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"VuePress/page.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
