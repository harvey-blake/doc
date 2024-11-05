<template><div><h1 id="快速上手" tabindex="-1"><a class="header-anchor" href="#快速上手"><span>快速上手</span></a></h1>
<div class="hint-container warning">
<p class="hint-container-title">Warning</p>
<p>VuePress v2 目前仍处于 RC (Release Candidate) 阶段。你已经可以用它来构建你的站点，但是它的配置和 API 还不够稳定，有可能会发生一些微小的 Breaking Changes 。因此，在每次更新 RC 版本之后，请一定要仔细阅读 <a href="https://github.com/vuepress/core/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer">更新日志</a>。</p>
</div>
<h2 id="在线试一试" tabindex="-1"><a class="header-anchor" href="#在线试一试"><span>在线试一试</span></a></h2>
<p>你可以通过 <a href="https://stackblitz.com/fork/vuepress" target="_blank" rel="noopener noreferrer">StackBlitz</a> 在你的浏览器里直接使用 VuePress 。</p>
<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2>
<h3 id="依赖环境" tabindex="-1"><a class="header-anchor" href="#依赖环境"><span>依赖环境</span></a></h3>
<ul>
<li><a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js v18.19.0+</a></li>
<li>包管理器，如 <a href="https://pnpm.io/zh/" target="_blank" rel="noopener noreferrer">pnpm</a>、<a href="https://classic.yarnpkg.com/en/" target="_blank" rel="noopener noreferrer">yarn</a>、<a href="https://www.npmjs.com/" target="_blank" rel="noopener noreferrer">npm</a> 等。</li>
</ul>
<div class="hint-container tip">
<p class="hint-container-title">Tips</p>
<ul>
<li>使用 <a href="https://pnpm.io/zh/" target="_blank" rel="noopener noreferrer">pnpm</a> 时，你需要安装 <code v-pre>vue</code> 作为 peer-dependencies 。</li>
<li>使用 <a href="https://yarnpkg.com/" target="_blank" rel="noopener noreferrer">yarn 2+</a> 时，你需要在 <a href="https://yarnpkg.com/configuration/yarnrc#nodeLinker" target="_blank" rel="noopener noreferrer"><code v-pre>.yarnrc.yml</code></a> 文件中设置 <code v-pre>nodeLinker: 'node-modules'</code> 。</li>
</ul>
</div>
<h3 id="创建项目" tabindex="-1"><a class="header-anchor" href="#创建项目"><span>创建项目</span></a></h3>
<h4 id="通过命令行创建" tabindex="-1"><a class="header-anchor" href="#通过命令行创建"><span>通过命令行创建</span></a></h4>
<p>你可以通过 <a href="https://www.npmjs.com/package/create-vuepress" target="_blank" rel="noopener noreferrer">create-vuepress</a> 直接创建项目模板。</p>
<CodeTabs id="55" :data='[{"id":"pnpm"},{"id":"yarn"},{"id":"npm"}]' tab-id="shell">
<template #title0="{ value, isActive }">pnpm</template>
<template #title1="{ value, isActive }">yarn</template>
<template #title2="{ value, isActive }">npm</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">pnpm</span> create vuepress vuepress-starter</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">yarn</span> create vuepress vuepress-starter</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></template>
<template #tab2="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">npm</span> init vuepress vuepress-starter</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></template>
</CodeTabs>
<h4 id="手动创建" tabindex="-1"><a class="header-anchor" href="#手动创建"><span>手动创建</span></a></h4>
<p>这一章节会帮助你从头搭建一个简单的 VuePress 文档网站。</p>
<ul>
<li>创建并进入一个新目录</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">mkdir</span> vuepress-starter</span>
<span class="line"><span class="token builtin class-name">cd</span> vuepress-starter</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>初始化项目</li>
</ul>
<CodeTabs id="87" :data='[{"id":"pnpm"},{"id":"yarn"},{"id":"npm"}]' tab-id="shell">
<template #title0="{ value, isActive }">pnpm</template>
<template #title1="{ value, isActive }">yarn</template>
<template #title2="{ value, isActive }">npm</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> init</span>
<span class="line"><span class="token function">pnpm</span> init</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> init</span>
<span class="line"><span class="token function">yarn</span> init</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab2="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> init</span>
<span class="line"><span class="token function">npm</span> init</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<ul>
<li>安装 VuePress</li>
</ul>
<CodeTabs id="105" :data='[{"id":"pnpm"},{"id":"yarn"},{"id":"npm"}]' tab-id="shell">
<template #title0="{ value, isActive }">pnpm</template>
<template #title1="{ value, isActive }">yarn</template>
<template #title2="{ value, isActive }">npm</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token comment"># 安装 vuepress 和 vue</span></span>
<span class="line"><span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> vuepress@next vue</span>
<span class="line"><span class="token comment"># 安装打包工具和主题</span></span>
<span class="line"><span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> @vuepress/bundler-vite@next @vuepress/theme-default@next</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token comment"># 安装 vuepress</span></span>
<span class="line"><span class="token function">yarn</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> vuepress@next</span>
<span class="line"><span class="token comment"># 安装打包工具和主题</span></span>
<span class="line"><span class="token function">yarn</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> @vuepress/bundler-vite@next @vuepress/theme-default@next</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab2="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token comment"># 安装 vuepress</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> vuepress@next</span>
<span class="line"><span class="token comment"># 安装打包工具和主题</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> @vuepress/bundler-vite@next @vuepress/theme-default@next</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<ul>
<li>创建 <code v-pre>docs</code> 目录和 <code v-pre>docs/.vuepress</code> 目录</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">mkdir</span> docs</span>
<span class="line"><span class="token function">mkdir</span> docs/.vuepress</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>创建 VuePress 配置文件 <code v-pre>docs/.vuepress/config.js</code></li>
</ul>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> viteBundler <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@vuepress/bundler-vite'</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> defaultTheme <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@vuepress/theme-default'</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> defineUserConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vuepress'</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineUserConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  bundler<span class="token operator">:</span> <span class="token function">viteBundler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  theme<span class="token operator">:</span> <span class="token function">defaultTheme</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>创建你的第一篇文档</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token builtin class-name">echo</span> <span class="token string">'# Hello VuePress'</span> <span class="token operator">></span> docs/README.md</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构"><span>目录结构</span></a></h2>
<p>创建完成后，你项目的目录结构应该是这样的：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">├─ docs</span>
<span class="line">│  ├─ .vuepress</span>
<span class="line">│  │  └─ config.js</span>
<span class="line">│  └─ README.md</span>
<span class="line">└─ package.json</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>docs</code> 目录是你放置 Markdown 文件的地方，它同时也会作为 VuePress 的源文件目录。</p>
<p><code v-pre>docs/.vuepress</code> 目录，即源文件目录下的 <code v-pre>.vuepress</code> 目录，是放置所有和 VuePress 相关的文件的地方。当前这里只有一个配置文件。默认还会在该目录下生成临时文件、缓存文件和构建输出文件。建议你把它们添加到 <code v-pre>.gitignore</code> 文件中。</p>
<details class="hint-container details"><summary>示例 <code v-pre>.gitignore</code> 文件</summary>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line"># VuePress 默认临时文件目录</span>
<span class="line">.vuepress/.temp</span>
<span class="line"># VuePress 默认缓存目录</span>
<span class="line">.vuepress/.cache</span>
<span class="line"># VuePress 默认构建生成的静态文件目录</span>
<span class="line">.vuepress/dist</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h2 id="开始使用-vuepress" tabindex="-1"><a class="header-anchor" href="#开始使用-vuepress"><span>开始使用 VuePress</span></a></h2>
<h3 id="启动开发服务器" tabindex="-1"><a class="header-anchor" href="#启动开发服务器"><span>启动开发服务器</span></a></h3>
<p>你可以在 <code v-pre>package.json</code> 中添加一些 <a href="https://classic.yarnpkg.com/zh-Hans/docs/package-json#toc-scripts" target="_blank" rel="noopener noreferrer">scripts</a> ：</p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"docs:dev"</span><span class="token operator">:</span> <span class="token string">"vuepress dev docs"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"docs:build"</span><span class="token operator">:</span> <span class="token string">"vuepress build docs"</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行 <code v-pre>docs:dev</code> 脚本可以启动开发服务器:</p>
<CodeTabs id="169" :data='[{"id":"pnpm"},{"id":"yarn"},{"id":"npm"}]' tab-id="shell">
<template #title0="{ value, isActive }">pnpm</template>
<template #title1="{ value, isActive }">yarn</template>
<template #title2="{ value, isActive }">npm</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">pnpm</span> docs:dev</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">yarn</span> docs:dev</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></template>
<template #tab2="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">npm</span> run docs:dev</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>VuePress 会在 <a href="http://localhost:8080" target="_blank" rel="noopener noreferrer">http://localhost:8080</a> 启动一个热重载的开发服务器。当你修改你的 Markdown 文件时，浏览器中的内容也会自动更新。</p>
<h3 id="构建你的网站" tabindex="-1"><a class="header-anchor" href="#构建你的网站"><span>构建你的网站</span></a></h3>
<p>运行 <code v-pre>docs:build</code> 脚本可以构建你的网站：</p>
<CodeTabs id="189" :data='[{"id":"pnpm"},{"id":"yarn"},{"id":"npm"}]' tab-id="shell">
<template #title0="{ value, isActive }">pnpm</template>
<template #title1="{ value, isActive }">yarn</template>
<template #title2="{ value, isActive }">npm</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">pnpm</span> docs:build</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">yarn</span> docs:build</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></template>
<template #tab2="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">npm</span> run docs:build</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>在 <code v-pre>docs/.vuepress/dist</code> 目录中可以找到构建生成的静态文件。</p>
<h2 id="进一步了解-vuepress" tabindex="-1"><a class="header-anchor" href="#进一步了解-vuepress"><span>进一步了解 VuePress</span></a></h2>
<p>现在，你应该已经有了一个简单可用的 VuePress 网站。但你可能仍需要阅读后续的指南来更加了解 VuePress 。</p>
<p>下一步，前往 <RouteLink to="/VuePress/configuration.html">配置</RouteLink> 了解更多配置文件相关的内容。</p>
</div></template>


