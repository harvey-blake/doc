export const themeData = JSON.parse("{\"logo\":\"https://vuejs.press/images/hero.png\",\"navbar\":[{\"text\":\"首页\",\"link\":\"/\"},{\"text\":\"Ethers v6\",\"children\":[\"/ethers/hello\",\"/ethers/Provider\",\"/ethers/ReadContract\",\"/ethers/SendETH\",\"/ethers/WriteContract\",\"/ethers/DeployContract\",\"/ethers/Event\",\"/ethers/ContractListener\",\"/ethers/EventFilter\",\"/ethers/Units\",\"/ethers/staticCall\",\"/ethers/ERC721Check\",\"/ethers/EncodeCalldata\",\"/ethers/HDwallet\",\"/ethers/MultiTransfer\",\"/ethers/MultiCollect\",\"/ethers/MerkleTree\",\"/ethers/Signature\",\"/ethers/Mempool\",\"/ethers/DecodeTx\",\"/ethers/VanityAddress\",\"/ethers/ReadAnyData\",\"/ethers/frontrun\",\"/ethers/ERC20Checker\",\"/ethers/Flashbots\",\"/ethers/eip712\"]},{\"text\":\"Markdown\",\"children\":[\"/VuePress/VuePress1\"]}],\"sidebar\":{\"/ethers/\":[{\"text\":\"Ethers极简教程\",\"collapsible\":false,\"collapsed\":true,\"children\":[\"/ethers/hello\",\"/ethers/Provider\",\"/ethers/ReadContract\",\"/ethers/SendETH\",\"/ethers/WriteContract\",\"/ethers/DeployContract\",\"/ethers/Event\",\"/ethers/ContractListener\",\"/ethers/EventFilter\",\"/ethers/Units\",\"/ethers/staticCall\",\"/ethers/ERC721Check\",\"/ethers/EncodeCalldata\",\"/ethers/HDwallet\",\"/ethers/MultiTransfer\",\"/ethers/MultiCollect\",\"/ethers/MerkleTree\",\"/ethers/Signature\",\"/ethers/Mempool\",\"/ethers/DecodeTx\",\"/ethers/VanityAddress\",\"/ethers/ReadAnyData\",\"/ethers/frontrun\",\"/ethers/ERC20Checker\",\"/ethers/Flashbots\",\"/ethers/eip712\"]}],\"/VuePress/\":[{\"text\":\"Markdown基本语法\",\"collapsible\":false,\"children\":[\"/VuePress/VuePress1\"]}]},\"editLink\":true,\"lastUpdatedText\":\"上次更新\",\"repo\":\"harvey-blake/doc\",\"editLinks\":true,\"docsDir\":\"docs\",\"editLinkText\":\"编辑此页\",\"contributors\":false,\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"lastUpdated\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
