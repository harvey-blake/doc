import { defaultTheme } from '@vuepress/theme-default';
import { defineUserConfig } from 'vuepress/cli';
import { webpackBundler } from '@vuepress/bundler-webpack';

const VuePress = [
  '/VuePress/getting-started',
  '/VuePress/configuration',
  '/VuePress/page',
  '/VuePress/VuePress1',
]

const ethers = [
  '/ethers/hello',
  '/ethers/Provider',
  '/ethers/ReadContract',
  '/ethers/SendETH',
  '/ethers/WriteContract',
]


export default defineUserConfig({
  lang: 'zh-CN',
  title: 'Harvey Blake',
  description: 'A documentation site for Harvey Blake.',

  // 设置主题配置
  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    // 配置导航栏
    navbar: [
      { text: '首页', link: '/' },
      {
        text: 'VuePress',
        children: VuePress,
      },
      {
        text: 'Ethers v6',
        children: ethers,
      }
    ],
    sidebar: {
      '/VuePress/': [
        {
          text: 'VuePress指南',
          collapsible: false,
          children: VuePress,
        },
      ],

      // 对于 /ethers/ 下的页面，显示 Ethers 极简教程的侧边栏
      '/ethers/': [
        {
          text: 'Ethers极简教程',
          collapsible: false,  // 允许折叠
          collapsed: true,    // 默认折叠状态
          children: ethers,
        },
      ],
    },

    // lastUpdated: false,
    editLink: true,

    lastUpdatedText: '上次更新',

    repo: 'harvey-blake/doc', // 替换为您的 GitHub 仓库
    editLinks: true, // 启用编辑链接
    docsDir: 'docs',
    editLinkText: '编辑此页',
    contributors: false,
    // sidebarDepth: 0,
  }),


  // 使用 webpack 打包器
  bundler: webpackBundler(),
});
