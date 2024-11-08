export const siteData = JSON.parse("{\"base\":\"/\",\"lang\":\"zh-CN\",\"title\":\"Harvey Blake\",\"description\":\"白天搞智能合约，晚上撸前端代码，只要咖啡还续着，凌晨照样在线！会说 Solidity、PHP、Node.js，还有 Vue 和 HTML 的“方言”，代码不怕我不写，就怕写完跑太快。Bug？那都是小场面，一出手就搞定。我的宗旨是——交付准时，调试无敌，客户满意才是真理！\",\"head\":[],\"locales\":{}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
