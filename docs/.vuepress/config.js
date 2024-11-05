import { defaultTheme } from '@vuepress/theme-default';
import { defineUserConfig } from 'vuepress/cli';
import { webpackBundler } from '@vuepress/bundler-webpack';
import { searchPlugin } from '@vuepress/plugin-search'


const ethers = [
  '/ethers/hello',
  '/ethers/Provider',
  '/ethers/ReadContract',
  '/ethers/SendETH',
  '/ethers/WriteContract',
  '/ethers/DeployContract',
  '/ethers/Event',
  '/ethers/ContractListener',
  '/ethers/EventFilter',
  '/ethers/Units',
  '/ethers/staticCall',
  '/ethers/ERC721Check',
  '/ethers/EncodeCalldata',
  '/ethers/HDwallet',
  '/ethers/MultiTransfer',
  '/ethers/MultiCollect',
  '/ethers/MerkleTree',
  '/ethers/Signature',
  '/ethers/Mempool',
  '/ethers/DecodeTx',
  '/ethers/VanityAddress',
  '/ethers/ReadAnyData',
  '/ethers/frontrun',
  '/ethers/ERC20Checker',
  '/ethers/Flashbots',
  '/ethers/eip712'
]

const solidity = [
  '/Solidity/HelloWeb3',
  '/Solidity/ValueTypes',
  '/Solidity/Function',
  '/Solidity/Return',
  '/Solidity/DataStorage',
  '/Solidity/ArrayAndStruct',
  '/Solidity/Mapping',
  '/Solidity/InitialValue',
  '/Solidity/Constant',
  '/Solidity/InsertionSort',
  '/Solidity/Modifier',
  '/Solidity/Event',
  '/Solidity/Inheritance',
  '/Solidity/Interface',
  '/Solidity/Error',
  '/Solidity/Overloading',
]


export default defineUserConfig({
  lang: 'zh-CN',
  title: 'Harvey Blake',
  description: 'A documentation site for Harvey Blake.',

  plugins: [
    searchPlugin({
      // 可选的配置项
      locales: {
        '/': {
          placeholder: '搜索',
        },
      },
      // 其他配置选项
      maxSuggestions: 10, // 最大显示的搜索建议条目数量
    }),
  ],


  // 设置主题配置
  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    // 配置导航栏
    navbar: [
      { text: '首页', link: '/' },
      {
        text: 'Ethers v6教程',
        children: ethers,
      },
      {
        text: 'Solidity 入门',
        children: solidity,
      },


    ],
    sidebar: {
      // 对于 /ethers/ 下的页面，显示 Ethers 极简教程的侧边栏
      '/ethers/': [
        {
          text: 'Ethers极简教程',
          collapsible: false,  // 允许折叠
          collapsed: true,    // 默认折叠状态
          children: ethers,
        },
      ],
      '/Solidity/': [
        {
          text: 'Solidity 入门教程',
          collapsible: false,
          children: solidity,
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
