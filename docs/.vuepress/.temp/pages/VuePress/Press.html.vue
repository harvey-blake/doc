<template><div><h1 id="快速上手" tabindex="-1"><a class="header-anchor" href="#快速上手"><span>快速上手</span></a></h1>
<div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>VuePress v2 目前仍处于 RC (Release Candidate) 阶段。你已经可以用它来构建你的站点，但是它的配置和 API 还不够稳定，有可能会发生一些微小的 Breaking Changes 。因此，在每次更新 RC 版本之后，请一定要仔细阅读 更新日志。</p>
</div>
<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2>
<h3 id="依赖环境" tabindex="-1"><a class="header-anchor" href="#依赖环境"><span>依赖环境</span></a></h3>
<ul>
<li>Node.js v18.19.0+</li>
<li>包管理器，如 pnpm、yarn、npm 等。</li>
</ul>
<h3 id="提示" tabindex="-1"><a class="header-anchor" href="#提示"><span>提示</span></a></h3>
<ul>
<li>使用 pnpm 时，你需要安装 vue 作为 peer-dependencies 。</li>
<li>使用 yarn 2+ 时，你需要在 .yarnrc.yml 文件中设置 <code v-pre>nodeLinker: 'node-modules'</code> 。</li>
</ul>
<h2 id="创建项目" tabindex="-1"><a class="header-anchor" href="#创建项目"><span>创建项目</span></a></h2>
<h3 id="通过命令行创建" tabindex="-1"><a class="header-anchor" href="#通过命令行创建"><span>通过命令行创建</span></a></h3>
<p>你可以通过 create-vuepress 直接创建项目模板。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">npm</span> init vuepress vuepress-starter</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="手动创建" tabindex="-1"><a class="header-anchor" href="#手动创建"><span>手动创建</span></a></h3>
<p>这一章节会帮助你从头搭建一个简单的 VuePress 文档网站。</p>
<ol>
<li>
<p>创建并进入一个新目录：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">mkdir</span> vuepress-starter</span>
<span class="line"><span class="token builtin class-name">cd</span> vuepress-starter</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>初始化项目：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> init</span>
<span class="line"><span class="token function">npm</span> init</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>安装 VuePress：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token comment"># 安装 vuepress</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> vuepress@next</span>
<span class="line"><span class="token comment"># 安装打包工具和主题</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> @vuepress/bundler-vite@next @vuepress/theme-default@next</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>创建 <code v-pre>docs</code> 目录和 <code v-pre>docs/.vuepress</code> 目录：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">mkdir</span> docs</span>
<span class="line"><span class="token function">mkdir</span> docs/.vuepress</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>创建 VuePress 配置文件 <code v-pre>docs/.vuepress/config.js</code>：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> viteBundler <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@vuepress/bundler-vite'</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> defaultTheme <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@vuepress/theme-default'</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> defineUserConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vuepress'</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineUserConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">bundler</span><span class="token operator">:</span> <span class="token function">viteBundler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">theme</span><span class="token operator">:</span> <span class="token function">defaultTheme</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>创建你的第一篇文档：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token builtin class-name">echo</span> <span class="token string">'# Hello VuePress'</span> <span class="token operator">></span> docs/README.md</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ol>
<h2 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构"><span>目录结构</span></a></h2>
<p>创建完成后，你项目的目录结构应该是这样的：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">├─ docs</span>
<span class="line">│  ├─ .vuepress</span>
<span class="line">│  │  └─ config.js</span>
<span class="line">│  └─ README.md</span>
<span class="line">└─ package.json</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>docs</code> 目录是你放置 Markdown 文件的地方，它同时也会作为 VuePress 的源文件目录。</p>
<p><code v-pre>docs/.vuepress</code> 目录，即源文件目录下的 .vuepress 目录，是放置所有和 VuePress 相关的文件的地方。当前这里只有一个配置文件。默认还会在该目录下生成临时文件、缓存文件和构建输出文件。建议你把它们添加到 .gitignore 文件中。</p>
<h3 id="示例-gitignore-文件" tabindex="-1"><a class="header-anchor" href="#示例-gitignore-文件"><span>示例 .gitignore 文件</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line"># logs</span>
<span class="line">logs</span>
<span class="line">*.log</span>
<span class="line">npm-debug.log*</span>
<span class="line">yarn-debug.log*</span>
<span class="line">yarn-error.log*</span>
<span class="line"></span>
<span class="line"># VuePress</span>
<span class="line">docs/.vuepress/dist</span>
<span class="line">docs/.vuepress/.temp</span>
<span class="line">docs/.vuepress/cache</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="开始使用-vuepress" tabindex="-1"><a class="header-anchor" href="#开始使用-vuepress"><span>开始使用 VuePress</span></a></h2>
<h3 id="启动开发服务器" tabindex="-1"><a class="header-anchor" href="#启动开发服务器"><span>启动开发服务器</span></a></h3>
<p>你可以在 <code v-pre>package.json</code> 中添加一些 scripts：</p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"docs:dev"</span><span class="token operator">:</span> <span class="token string">"vuepress dev docs"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"docs:build"</span><span class="token operator">:</span> <span class="token string">"vuepress build docs"</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行 <code v-pre>docs:dev</code> 脚本可以启动开发服务器：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">npm</span> run docs:dev</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>VuePress 会在 http://localhost:8080 启动一个热重载的开发服务器。当你修改你的 Markdown 文件时，浏览器中的内容也会自动更新。</p>
<h3 id="构建你的网站" tabindex="-1"><a class="header-anchor" href="#构建你的网站"><span>构建你的网站</span></a></h3>
<p>运行 <code v-pre>docs:build</code> 脚本可以构建你的网站：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">npm</span> run docs:build</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>在 <code v-pre>docs/.vuepress/dist</code> 目录中可以找到构建生成的静态文件。你可以查看 <a href="https://vuepress.vuejs.org/guide/deploy.html" target="_blank" rel="noopener noreferrer">部署</a> 来了解如何部署你的网站。</p>
</div></template>


