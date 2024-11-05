import { defaultTheme } from '@vuepress/theme-default';
import { defineUserConfig } from 'vuepress/cli';
import { webpackBundler } from '@vuepress/bundler-webpack';

export default defineUserConfig({
  lang: 'en-US',

  title: 'Harvey Blake',
  description: 'A documentation site for Harvey Blake.',

  // 设置主题配置
  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    // 配置导航栏
    navbar: [
      { text: 'Home', link: '/' },
      {
        text: 'VuePress',
        children: [
          '/VuePress/getting-started',
          '/VuePress/configuration',
          '/VuePress/page',
          '/VuePress/VuePress1',
        ],
      },
      { text: 'GitHub', link: 'https://github.com/your-repo' }, // 添加 GitHub 链接
    ],
    sidebar: [
      {
        text: 'VuePress指南',
        collapsible: false,
        children: [
          '/VuePress/getting-started',
          '/VuePress/configuration',
          '/VuePress/page',
          '/VuePress/VuePress1',
        ],
      },
    ],

  }),

  // 使用 webpack 打包器
  bundler: webpackBundler(),
});
