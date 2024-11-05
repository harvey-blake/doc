<template><div><h1 id="hellovitalik-6行代码" tabindex="-1"><a class="header-anchor" href="#hellovitalik-6行代码"><span>HelloVitalik (6行代码)</span></a></h1>
<p>这一讲，我们会介绍<code v-pre>ethers.js</code>库，javascript在线编辑器<code v-pre>playcode</code>，并且我们会写第一个程序<code v-pre>HelloVitalik</code>：查询Vitalik的<code v-pre>ETH</code>余额，并输出在<code v-pre>console</code>中。</p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>教程使用 ethers.js 最新的 v6 版本，与 v5 改动较大。</p>
</div>
<h2 id="ethers-js简述" tabindex="-1"><a class="header-anchor" href="#ethers-js简述"><span>ethers.js简述</span></a></h2>
<p><code v-pre>ethers.js</code>是一个完整而紧凑的开源库，用于与以太坊区块链及其生态系统进行交互。如果你要写Dapp的前端，你就需要用到<code v-pre>ethers.js</code>。</p>
<p>与更早出现的<code v-pre>web3.js</code>相比，它有以下优点：</p>
<ol>
<li>代码更加紧凑：<code v-pre>ethers.js</code>大小为116.5 kB，而<code v-pre>web3.js</code>为590.6 kB。</li>
<li>更加安全：<code v-pre>Web3.js</code>认为用户会在本地部署以太坊节点，私钥和网络连接状态由这个节点管理（实际并不是这样）；<code v-pre>ethers.js</code>中，<code v-pre>Provider</code>提供器类管理网络连接状态，<code v-pre>Wallet</code>钱包类管理密钥，安全且灵活。</li>
<li>原生支持<code v-pre>ENS</code>。</li>
</ol>
<p><img src="@source/ethers/img/1-1.png" alt="ethers.js连接Dapp前端和区块链"></p>
<h2 id="开发工具" tabindex="-1"><a class="header-anchor" href="#开发工具"><span>开发工具</span></a></h2>
<h3 id="_1-vscode-推荐" tabindex="-1"><a class="header-anchor" href="#_1-vscode-推荐"><span>1. VScode（推荐）</span></a></h3>
<p>你可以使用本地<code v-pre>vscode</code>进行开发。你需要安装<a href="https://nodejs.org/zh-cn/download/" target="_blank" rel="noopener noreferrer">Node.js</a>，然后利用包管理工具<code v-pre>npm</code>安装<code v-pre>ethers</code>库：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">npm</span> <span class="token function">install</span> ethers <span class="token parameter variable">--save</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="_2-playcode-不稳定" tabindex="-1"><a class="header-anchor" href="#_2-playcode-不稳定"><span>2. playcode（不稳定）</span></a></h3>
<p><img src="@source/ethers/img/1-2.png" alt="playcode"></p>
<p><a href="https://playcode.io/" target="_blank" rel="noopener noreferrer">playcode</a>是一个在线编译<code v-pre>javascript</code>的平台，你不需要配置<code v-pre>Nodejs</code>就可以运行<code v-pre>.js</code>文件，非常方便。且要比更知名的<code v-pre>codesandbox</code>快一百倍。</p>
<p><img src="@source/ethers/img/1-3.png" alt="playcode"></p>
<p>这一讲，我们将用<code v-pre>playcode</code>做演示。你需要在官网注册一个免费账号，然后点击<code v-pre>OPEN PLAYGROUND</code>以<code v-pre>Javascript</code>模版创建一个新项目，然后将代码写在自动生成的<code v-pre>script.js</code>中即可。很多时候，<code v-pre>playcode</code>并不能稳定的使用<code v-pre>ethers</code>，因此我们推荐使用VScode。</p>
<h2 id="hellovitalik" tabindex="-1"><a class="header-anchor" href="#hellovitalik"><span>HelloVitalik</span></a></h2>
<p>现在，让我们用<code v-pre>ethers</code>编写第一个程序<code v-pre>HelloVitalik</code>：查询Vitalik的<code v-pre>ETH</code>余额，并输出在<code v-pre>console</code>中。整个程序只需要6行，非常简单！</p>
<p><strong>注意</strong>：在<code v-pre>playcode</code>上第一次运行可能会提示<code v-pre>module not found</code>，这是因为<code v-pre>ethers</code>库还没有安装，只需要点击<code v-pre>install</code>按钮安装即可。</p>
<p><img src="@source/ethers/img/1-4.png" alt="Hello Vitalik"></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ethers <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ethers"</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> provider <span class="token operator">=</span> ethers<span class="token punctuation">.</span><span class="token function">getDefaultProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">main</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> balance <span class="token operator">=</span> <span class="token keyword">await</span> provider<span class="token punctuation">.</span><span class="token function">getBalance</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">vitalik.eth</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">ETH Balance of vitalik: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>ethers<span class="token punctuation">.</span><span class="token function">formatEther</span><span class="token punctuation">(</span>balance<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> ETH</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们逐行分析这个程序：</p>
<h3 id="_1-导入ethers" tabindex="-1"><a class="header-anchor" href="#_1-导入ethers"><span>1. 导入<code v-pre>ethers</code></span></a></h3>
<p>第一行的作用是导入已经安装好的<code v-pre>ethers</code>库：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ethers <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ethers"</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>如果在<code v-pre>playcode</code>平台上，免费账号不能安装外部库。我们可以直接从<code v-pre>ethers</code>的CDN导入（出于安全考虑，仅用于教学）：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ethers <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://cdnjs.cloudflare.com/ajax/libs/ethers/6.2.3/ethers.js"</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="_2-连接以太坊" tabindex="-1"><a class="header-anchor" href="#_2-连接以太坊"><span>2. 连接以太坊</span></a></h3>
<p>在<code v-pre>ethers</code>中，<code v-pre>Provider</code>类是一个为以太坊网络连接提供抽象的类，它提供对区块链及其状态的只读访问。我们声明一个<code v-pre>provider</code>用于连接以太坊网络。<code v-pre>ethers</code>内置了一些公用<code v-pre>rpc</code>，方便用户连接以太坊：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> provider <span class="token operator">=</span> ethers<span class="token punctuation">.</span><span class="token function">getDefaultProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>注意:</strong><code v-pre>ethers</code>内置的<code v-pre>rpc</code>访问速度有限制，仅测试用，生产环境还是要申请个人<code v-pre>rpc</code>。比如:</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token constant">ALCHEMY_MAINNET_URL</span> <span class="token operator">=</span> <span class="token string">'https://eth-mainnet.g.alchemy.com/v2/oKmOQKbneVkxgHZfibs-iFhIlIAl6HDN'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> provider <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>JsonRpcProvider</span><span class="token punctuation">(</span><span class="token constant">ALCHEMY_MAINNET_URL</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-声明async函数" tabindex="-1"><a class="header-anchor" href="#_3-声明async函数"><span>3. 声明<code v-pre>async</code>函数</span></a></h3>
<p>由于和区块链交互不是实时的我们需要用到js的<code v-pre>async/await</code>语法糖。每次和链交互的调用需要用到<code v-pre>await</code>，再把这些用<code v-pre>async</code>函数包裹起来，最后再调用这个函数。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token function-variable function">main</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">//...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-获取vitalik地址的eth余额" tabindex="-1"><a class="header-anchor" href="#_4-获取vitalik地址的eth余额"><span>4. 获取Vitalik地址的<code v-pre>ETH</code>余额</span></a></h3>
<p>我们可以利用<code v-pre>Provider</code>类的<code v-pre>getBalance()</code>函数来查询某个地址的<code v-pre>ETH</code>余额。由于<code v-pre>ethers</code>原生支持<code v-pre>ENS</code>域名，我们不需要知道具体地址，用<code v-pre>ENS</code>域名<code v-pre>vitalik.eth</code>就可以查询到以太坊创始人豚林-vitalik的余额。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> balance <span class="token operator">=</span> <span class="token keyword">await</span> provider<span class="token punctuation">.</span><span class="token function">getBalance</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">vitalik.eth</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="_5-转换单位后在console中输出" tabindex="-1"><a class="header-anchor" href="#_5-转换单位后在console中输出"><span>5. 转换单位后在<code v-pre>console</code>中输出</span></a></h3>
<p>我们从链上获取的以太坊余额以<code v-pre>wei</code>为单位，而<code v-pre>1 ETH = 10^18 wei</code>。我们打印在<code v-pre>console</code>之前，需要进行单位转换。<code v-pre>ethers</code>提供了功能函数<code v-pre>formatEther</code>，我们可以利用它将<code v-pre>wei</code>转换为<code v-pre>ETH</code>。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">ETH Balance of vitalik: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>ethers<span class="token punctuation">.</span><span class="token function">formatEther</span><span class="token punctuation">(</span>balance<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> ETH</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>如果你使用的是vscode开发工具的话，你需要在vscode控制台输入以下命令</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">node</span> 01_HelloVitalik/HelloVitalik.js</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>这样，你就能在控制台中看到Vitalik的<code v-pre>ETH</code>余额了：<code v-pre>1951 ETH</code>。当然这不是Vitalik的全部持仓，他有多个钱包，<code v-pre>vitalik.eth</code>应该只是他用的比较频繁的一个热钱包。</p>
<p><img src="@source/ethers/img/1-5.png" alt="在控制台打印Vitalik余额"></p>
<h2 id="示例代码" tabindex="-1"><a class="header-anchor" href="#示例代码"><span>示例代码</span></a></h2>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// 导入ethers包</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ethers <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ethers"</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// playcode免费版不能安装ethers，用这条命令，需要从网络上import包（把上面这行注释掉）</span></span>
<span class="line"><span class="token comment">// import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.2.3/ethers.js";</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 利用ethers默认的Provider连接以太坊网络</span></span>
<span class="line"><span class="token comment">// const provider = new ethers.getDefaultProvider();</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token constant">ALCHEMY_MAINNET_URL</span> <span class="token operator">=</span> <span class="token string">'https://eth-mainnet.g.alchemy.com/v2/oKmOQKbneVkxgHZfibs-iFhIlIAl6HDN'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> provider <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>JsonRpcProvider</span><span class="token punctuation">(</span><span class="token constant">ALCHEMY_MAINNET_URL</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">main</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 查询vitalik的ETH余额</span></span>
<span class="line">    <span class="token keyword">const</span> balance <span class="token operator">=</span> <span class="token keyword">await</span> provider<span class="token punctuation">.</span><span class="token function">getBalance</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">vitalik.eth</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token comment">// 将余额输出在console</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">ETH Balance of vitalik: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>ethers<span class="token punctuation">.</span><span class="token function">formatEther</span><span class="token punctuation">(</span>balance<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> ETH</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<p>这是WTF Ethers极简教程的第一讲，我们介绍了<code v-pre>ethers.js</code>，并完成了第一个使用<code v-pre>ethers</code>的程序<code v-pre>HelloVitalik</code>，查询Vitalik钱包的<code v-pre>ETH</code>余额。</p>
<p><strong>课后作业</strong>：在图4和图5中，Vitalik的<code v-pre>ETH</code>余额并不一样。第一张余额为<code v-pre>2251 ETH</code>，而第二张变为了<code v-pre>1951 ETH</code>，减少<code v-pre>300 ETH</code>。其实，两张图片对应Vitalik在<code v-pre>2022.07.30</code>和<code v-pre>2022.07.31</code>的持仓。那么，这一天Vitalik用<code v-pre>300 ETH</code>干了什么？</p>
<ul>
<li>ethers<a href="https://docs.ethers.io/v5/" target="_blank" rel="noopener noreferrer">v5</a>官方文档：https://docs.ethers.io/v5/</li>
<li>ethers<a href="https://docs.ethers.io/v5/" target="_blank" rel="noopener noreferrer">v6</a>官方文档：https://docs.ethers.io/v6/</li>
</ul>
</div></template>


