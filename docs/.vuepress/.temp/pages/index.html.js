import comp from "E:/www/doc/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"Home\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"title\":\"Home\",\"heroImage\":\"https://vuejs.press/images/hero.png\",\"actions\":[{\"text\":\"联系作者\",\"link\":\"https://t.me/eduvue\",\"type\":\"primary\"},{\"text\":\"Get Started\",\"link\":\"/VuePress.html\",\"type\":\"primary\"}],\"features\":[{\"title\":\"项目概览：\",\"details\":\"介绍我所涉及的主要项目，包括项目的目标、使用的技术栈和实现思路。\"},{\"title\":\"技术指南：\",\"details\":\"记录一些核心技术和工具的使用方法、最佳实践以及常见问题的解决方案。\"},{\"title\":\"代码示例：\",\"details\":\"整理了一些常用代码片段，便于快速查阅和应用。\"},{\"title\":\"学习笔记：\",\"details\":\"记录在学习新知识时的理解和总结，帮助巩固知识。\"}],\"footer\":\"MIT 协议 | 版权所有 © 2018-至今 Harvey Blake\"},\"headers\":[],\"git\":{\"updatedTime\":1730773554000},\"filePathRelative\":\"README.md\"}")
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
