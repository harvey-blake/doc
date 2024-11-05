import comp from "E:/www/doc/docs/.vuepress/.temp/pages/VuePress/configuration.html.vue"
const data = JSON.parse("{\"path\":\"/VuePress/configuration.html\",\"title\":\"配置\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"配置文件\",\"slug\":\"配置文件\",\"link\":\"#配置文件\",\"children\":[]},{\"level\":2,\"title\":\"客户端配置文件\",\"slug\":\"客户端配置文件\",\"link\":\"#客户端配置文件\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"VuePress/configuration.md\"}")
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
