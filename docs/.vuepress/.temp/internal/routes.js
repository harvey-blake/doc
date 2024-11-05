export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/www/doc/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"首页"} }],
  ["/ethers/ContractListener.html", { loader: () => import(/* webpackChunkName: "ethers_ContractListener.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/ContractListener.html.js"), meta: {"title":"8. 监听合约事件"} }],
  ["/ethers/DecodeTx.html", { loader: () => import(/* webpackChunkName: "ethers_DecodeTx.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/DecodeTx.html.js"), meta: {"title":"20. 解码交易详情"} }],
  ["/ethers/DeployContract.html", { loader: () => import(/* webpackChunkName: "ethers_DeployContract.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/DeployContract.html.js"), meta: {"title":"6. 部署合约"} }],
  ["/ethers/eip712.html", { loader: () => import(/* webpackChunkName: "ethers_eip712.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/eip712.html.js"), meta: {"title":"26. EIP712 签名脚本"} }],
  ["/ethers/EncodeCalldata.html", { loader: () => import(/* webpackChunkName: "ethers_EncodeCalldata.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/EncodeCalldata.html.js"), meta: {"title":"13. 编码calldata"} }],
  ["/ethers/ERC20Checker.html", { loader: () => import(/* webpackChunkName: "ethers_ERC20Checker.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/ERC20Checker.html.js"), meta: {"title":"24. 识别ERC20合约"} }],
  ["/ethers/ERC721Check.html", { loader: () => import(/* webpackChunkName: "ethers_ERC721Check.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/ERC721Check.html.js"), meta: {"title":"12. 识别ERC721合约"} }],
  ["/ethers/Event.html", { loader: () => import(/* webpackChunkName: "ethers_Event.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/Event.html.js"), meta: {"title":"7. 检索事件"} }],
  ["/ethers/EventFilter.html", { loader: () => import(/* webpackChunkName: "ethers_EventFilter.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/EventFilter.html.js"), meta: {"title":"9. 事件过滤"} }],
  ["/ethers/Flashbots.html", { loader: () => import(/* webpackChunkName: "ethers_Flashbots.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/Flashbots.html.js"), meta: {"title":"25. Flashbots"} }],
  ["/ethers/frontrun.html", { loader: () => import(/* webpackChunkName: "ethers_frontrun.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/frontrun.html.js"), meta: {"title":"23. 抢先交易脚本"} }],
  ["/ethers/HDwallet.html", { loader: () => import(/* webpackChunkName: "ethers_HDwallet.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/HDwallet.html.js"), meta: {"title":"14. 批量生成钱包"} }],
  ["/ethers/hello.html", { loader: () => import(/* webpackChunkName: "ethers_hello.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/hello.html.js"), meta: {"title":"1. HelloVitalik (6行代码)"} }],
  ["/ethers/Mempool.html", { loader: () => import(/* webpackChunkName: "ethers_Mempool.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/Mempool.html.js"), meta: {"title":"19. 监听Mempool"} }],
  ["/ethers/MerkleTree.html", { loader: () => import(/* webpackChunkName: "ethers_MerkleTree.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/MerkleTree.html.js"), meta: {"title":"17. MerkleTree脚本"} }],
  ["/ethers/MultiCollect.html", { loader: () => import(/* webpackChunkName: "ethers_MultiCollect.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/MultiCollect.html.js"), meta: {"title":"16. 批量归集"} }],
  ["/ethers/MultiTransfer.html", { loader: () => import(/* webpackChunkName: "ethers_MultiTransfer.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/MultiTransfer.html.js"), meta: {"title":"15. 批量转账"} }],
  ["/ethers/Provider.html", { loader: () => import(/* webpackChunkName: "ethers_Provider.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/Provider.html.js"), meta: {"title":"2. Provider 提供器"} }],
  ["/ethers/ReadAnyData.html", { loader: () => import(/* webpackChunkName: "ethers_ReadAnyData.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/ReadAnyData.html.js"), meta: {"title":"22. 读取任意数据"} }],
  ["/ethers/ReadContract.html", { loader: () => import(/* webpackChunkName: "ethers_ReadContract.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/ReadContract.html.js"), meta: {"title":"3. 读取合约信息"} }],
  ["/ethers/SendETH.html", { loader: () => import(/* webpackChunkName: "ethers_SendETH.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/SendETH.html.js"), meta: {"title":"4. 发送ETH"} }],
  ["/ethers/Signature.html", { loader: () => import(/* webpackChunkName: "ethers_Signature.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/Signature.html.js"), meta: {"title":"18. 数字签名脚本"} }],
  ["/ethers/staticCall.html", { loader: () => import(/* webpackChunkName: "ethers_staticCall.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/staticCall.html.js"), meta: {"title":"11. StaticCall"} }],
  ["/ethers/Units.html", { loader: () => import(/* webpackChunkName: "ethers_Units.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/Units.html.js"), meta: {"title":"10. BigInt和单位转换"} }],
  ["/ethers/VanityAddress.html", { loader: () => import(/* webpackChunkName: "ethers_VanityAddress.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/VanityAddress.html.js"), meta: {"title":"21. 靓号生成器"} }],
  ["/ethers/WriteContract.html", { loader: () => import(/* webpackChunkName: "ethers_WriteContract.html" */"E:/www/doc/docs/.vuepress/.temp/pages/ethers/WriteContract.html.js"), meta: {"title":"5. 合约交互"} }],
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
