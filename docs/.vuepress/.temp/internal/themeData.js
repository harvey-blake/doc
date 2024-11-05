export const themeData = JSON.parse("{\"logo\":\"https://vuejs.press/images/hero.png\",\"navbar\":[{\"text\":\"首页\",\"link\":\"/\"},{\"text\":\"VuePress\",\"children\":[\"/VuePress/getting-started\",\"/VuePress/configuration\",\"/VuePress/page\",\"/VuePress/VuePress1\"]},{\"text\":\"GitHub\",\"link\":\"https://github.com/harvey-blake\"}],\"sidebar\":[{\"text\":\"VuePress指南\",\"collapsible\":false,\"children\":[\"/VuePress/getting-started\",\"/VuePress/configuration\",\"/VuePress/page\",\"/VuePress/VuePress1\"]}],\"editLink\":true,\"lastUpdatedText\":\"上次更新\",\"repo\":\"harvey-blake/doc\",\"editLinks\":true,\"editLinkText\":\"在 GitHub 上编辑此页\",\"lastUpdated\":\"上次更新\",\"contributors\":false,\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

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
