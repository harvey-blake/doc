<template><div><h1 id="_1-hello-web3-三行代码" tabindex="-1"><a class="header-anchor" href="#_1-hello-web3-三行代码"><span>1. Hello Web3 (三行代码)</span></a></h1>
<h2 id="solidity-简介" tabindex="-1"><a class="header-anchor" href="#solidity-简介"><span>Solidity 简介</span></a></h2>
<p><code v-pre>Solidity</code> 是一种用于编写以太坊虚拟机（<code v-pre>EVM</code>）智能合约的编程语言。我认为掌握 <code v-pre>Solidity</code> 是参与链上项目的必备技能：区块链项目大部分是开源的，如果你能读懂代码，就可以规避很多亏钱项目。</p>
<p><code v-pre>Solidity</code> 具有两个特点：</p>
<ol>
<li>&quot;基于对象&quot;：学会 <code v-pre>Solidity</code> 之后，可以助你在区块链领域找到好工作，挣钱找对象。</li>
<li>&quot;高级&quot;：不会 <code v-pre>Solidity</code>，在币圈会显得很 low。</li>
</ol>
<h2 id="开发工具-remix" tabindex="-1"><a class="header-anchor" href="#开发工具-remix"><span>开发工具：Remix</span></a></h2>
<p>本教程中，我们将使用 <code v-pre>Remix</code> 运行 <code v-pre>Solidity</code> 合约。<code v-pre>Remix</code> 是以太坊官方推荐的智能合约集成开发环境（IDE），适合新手，可以在浏览器中快速开发和部署合约，无需在本地安装任何程序。</p>
<p>网址：<a href="https://remix.ethereum.org" target="_blank" rel="noopener noreferrer">https://remix.ethereum.org</a></p>
<p>在 <code v-pre>Remix</code> 中，左侧菜单有三个按钮，分别对应文件（编写代码）、编译（运行代码）和部署（将合约部署到链上）。点击“创建新文件”（<code v-pre>Create New File</code>）按钮，即可创建一个空白的 <code v-pre>Solidity</code> 合约。</p>
<p><img src="@source/Solidity/img/1-1.png" alt="Remix 面板"></p>
<h2 id="第一个-solidity-程序" tabindex="-1"><a class="header-anchor" href="#第一个-solidity-程序"><span>第一个 Solidity 程序</span></a></h2>
<p>这个简单的程序只有 1 行注释和 3 行代码：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// SPDX-License-Identifier: MIT</span></span>
<span class="line"><span class="token keyword">pragma</span> <span class="token keyword">solidity</span> <span class="token operator">^</span><span class="token version number">0.8.21</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">HelloWeb3</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin">string</span> <span class="token keyword">public</span> _string <span class="token operator">=</span> <span class="token string">"Hello Web3!"</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们拆解程序，学习 Solidity 代码源文件的结构：</p>
<ol>
<li>
<p>第 1 行是注释，说明代码所使用的软件许可（license），这里使用的是 MIT 许可。如果不写许可，编译时会出现警告（warning），但程序仍可运行。Solidity 注释以“//”开头，后面跟注释内容，注释不会被程序执行。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// SPDX-License-Identifier: MIT</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>第 2 行声明源文件所使用的 Solidity 版本，因为不同版本的语法有差异。这行代码表示源文件将不允许小于 0.8.21 版本或大于等于 0.9.0 的编译器编译（第二个条件由 <code v-pre>^</code> 提供）。Solidity 语句以分号（;）结尾。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">pragma</span> <span class="token keyword">solidity</span> <span class="token operator">^</span><span class="token version number">0.8.21</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>第 3-4 行是合约部分。第 3 行创建合约（contract），并声明合约名为 <code v-pre>HelloWeb3</code>。第 4 行是合约内容，声明了一个 string（字符串）变量 <code v-pre>_string</code>，并赋值为 &quot;Hello Web3!&quot;。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">contract</span> <span class="token class-name">HelloWeb3</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin">string</span> <span class="token keyword">public</span> _string <span class="token operator">=</span> <span class="token string">"Hello Web3!"</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<p>后续我们会更详细地介绍 Solidity 中的变量。</p>
<h2 id="编译并部署代码" tabindex="-1"><a class="header-anchor" href="#编译并部署代码"><span>编译并部署代码</span></a></h2>
<p>在 Remix 编辑代码的页面，按 Ctrl + S 即可编译代码，非常方便。</p>
<p>编译完成后，点击左侧菜单的“部署”按钮，进入部署页面。</p>
<p><img src="@source/Solidity/img/1-2.png" alt="Deploy配图"></p>
<p>默认情况下，<code v-pre>Remix</code> 会使用 <code v-pre>Remix</code> 虚拟机（以前称为 JavaScript 虚拟机）来模拟以太坊链，运行智能合约，类似在浏览器里运行一条测试链。<code v-pre>Remix</code> 还会为你分配一些测试账户，每个账户里有 100 ETH（测试代币），随意使用。点击 <code v-pre>Deploy</code>（黄色按钮），即可部署我们编写的合约。</p>
<p><img src="@source/Solidity/img/1-3.png" alt="_string配图"></p>
<p>部署成功后，在下方会看到名为 <code v-pre>HelloWeb3</code> 的合约。点击 <code v-pre>_string</code>，即可看到 &quot;Hello Web3!&quot;。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<p>本节课程中，我们简要介绍了 <code v-pre>Solidity</code> 和 <code v-pre>Remix</code> 工具，并完成了第一个 <code v-pre>Solidity</code> 程序 —— <code v-pre>HelloWeb3</code>。接下来，我们将继续深入学习 <code v-pre>Solidity</code>！</p>
<h3 id="中文-solidity-资料推荐" tabindex="-1"><a class="header-anchor" href="#中文-solidity-资料推荐"><span>中文 Solidity 资料推荐</span></a></h3>
<ol>
<li><a href="https://docs.soliditylang.org/zh/v0.8.19/index.html" target="_blank" rel="noopener noreferrer">Solidity中文文档</a>（官方文档的中文翻译）</li>
</ol>
</div></template>


