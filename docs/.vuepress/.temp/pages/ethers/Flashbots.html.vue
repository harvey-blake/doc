<template><div><h1 id="_25-flashbots" tabindex="-1"><a class="header-anchor" href="#_25-flashbots"><span>25. Flashbots</span></a></h1>
<blockquote>
<p>目前 Flashbots Bundle 仅支持 ethers.js v5 版本。</p>
</blockquote>
<p>在以太坊转为 POS 之后，有超过 60% 的区块都是 flashbots 产出的，非常惊人，但是很多人并不了解它。这一讲，我们将介绍 Flashbots，包括:</p>
<ol>
<li>什么是 Flashbots?</li>
<li>普通用户如何连接 Flashbots 节点发送隐私交易。</li>
<li>开发者如何使用 Flashbots Bundle 打包多笔交易。</li>
</ol>
<h2 id="flashbots" tabindex="-1"><a class="header-anchor" href="#flashbots"><span>Flashbots</span></a></h2>
<p>Flashbots 是致力于减轻 MEV（最大可提取价值）对区块链造成危害的研究组织。目前有以下几款产品:</p>
<ol>
<li>Flashbots RPC: 保护以太坊用户受到有害 MEV（三明治攻击）的侵害。</li>
<li>Flashbots Bundle: 帮助 MEV 搜索者（Searcher）在以太坊上提取 MEV。</li>
<li>mev-boost: 帮助以太坊 POS 节点通过 MEV 获取更多的 ETH 奖励。</li>
</ol>
<p>本教程中，我们主要介绍前两个产品。</p>
<h2 id="flashbots-rpc" tabindex="-1"><a class="header-anchor" href="#flashbots-rpc"><span>Flashbots RPC</span></a></h2>
<p>Flashbots RPC 是一款面向以太坊普通用户的免费产品，你只需要在加密的钱包中将 RPC（网络节点）设置为Flashbots RPC，就可以将交易发送到Flashbots的私有交易缓存池（mempool）而非公开的，从而免受抢先交易/三明治攻击的损害。如果你不了解mempool或抢先交易，可以阅读之前的 <RouteLink to="/ethers/Mempool.html">mempool</RouteLink> 和 <RouteLink to="/ethers/frontrun.html">抢先交易</RouteLink> 教程</p>
<p>下面我们演示一下如何用 Metamask 钱包连接 Flashbots RPC。</p>
<ol>
<li>点击 Metamask 顶部的网络按钮（默认显示 <code v-pre>Ethereum Mainnet</code>），然后点击底部的 <code v-pre>Add network</code> 按钮添加网络节点（新版 Metamask 还需要在下一个页面点击 <code v-pre>Add a network manually</code> 按钮）。</li>
</ol>
<p><img src="@source/ethers/img/25-1.png" alt=""></p>
<ol start="2">
<li>依次输入网络参数:</li>
</ol>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Network name: Flashbots RPC</span>
<span class="line">New RPC URL: https://rpc.flashbots.net</span>
<span class="line">Chain ID: 1</span>
<span class="line">Currency Symbol: ETH</span>
<span class="line">Block Explorer URL: https://etherscan.io</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/ethers/img/25-2.png" alt=""></p>
<p>完成这两步，你的加密钱包就成功的连接到了 Flashbots RPC，之后你只需要像往常一样操作钱包就可以避免三明治攻击了！</p>
<h2 id="flashbots-bundle" tabindex="-1"><a class="header-anchor" href="#flashbots-bundle"><span>Flashbots Bundle</span></a></h2>
<p>在区块链上搜索 MEV 机会的开发者被称为<code v-pre>搜索者</code>。Flashbots Bundle（交易包）是一款帮助搜索者提取以太坊交易中 MEV 的工具。搜索者可以利用它将多笔交易组合在一起，按照指定的顺序执行。</p>
<p>举个例子，搜索者在公共<code v-pre>mempool</code>发现一笔在 <code v-pre>Uniswap</code> 买入PEOPLE代币的交易有被三明治攻击的机会，他可以在这币交易前后各插入一笔买入和卖出的交易，组成交易 Bundle 发送给 Flashbots。这些交易将在指定的区块执行，不会改变顺序，且不用担心被别的MEV机器人攻击。</p>
<p><img src="@source/ethers/img/25-3.jpeg" alt="MEV Steps by 0xBeans.eth"></p>
<h2 id="flashbots-bundle-脚本" tabindex="-1"><a class="header-anchor" href="#flashbots-bundle-脚本"><span>Flashbots Bundle 脚本</span></a></h2>
<p>Flashbots 提供了 <a href="https://github.com/flashbots/ethers-provider-flashbots-bundle" target="_blank" rel="noopener noreferrer">ethers-provider-flashbots-bundle</a>，一个建立在 <code v-pre>ethers.js</code> 之上帮助搜索者连接 flashbots provider 并发送 flashbots bundle 的 JavaScript 库。你可以通过 <code v-pre>npm</code> 命令安装它。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">--save</span> @flashbots/ethers-provider-bundle</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>下面，我们利用它写一个脚本，给大家演示如何在 Sepolia 测试网发送 Flashbots Bundle。</p>
<ol>
<li>
<p>创建一个连接到非Flashbots RPC的普通provider，这里我们使用 Alchemy 提供的 Sepolia 测试网节点。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// 1. 普通rpc （非flashbots rpc）</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token constant">ALCHEMY_GOERLI_URL</span> <span class="token operator">=</span> <span class="token string">'https://eth-sepolia.g.alchemy.com/v2/424OtGw_2L1A2wH6wrbPVPvyukI-sCoK'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> provider <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>JsonRpcProvider</span><span class="token punctuation">(</span><span class="token constant">ALCHEMY_GOERLI_URL</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>创建 Flashbots <code v-pre>声誉私钥</code>，用于建立“声誉”，<a href="https://docs.flashbots.net/flashbots-auction/searchers/advanced/reputation" target="_blank" rel="noopener noreferrer">详情</a></p>
<blockquote>
<p>注意: 这个账户不要储存资金，它不是flashbots主私钥。</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> authKey <span class="token operator">=</span> <span class="token string">'0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2c'</span></span>
<span class="line"><span class="token keyword">const</span> authSigner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>Wallet</span><span class="token punctuation">(</span>authKey<span class="token punctuation">,</span> provider<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>创建 Flashbots RPC (测试网），用于发送交易，这里用到了普通provider和声誉私钥。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> flashbotsProvider <span class="token operator">=</span> <span class="token keyword">await</span> FlashbotsBundleProvider<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span></span>
<span class="line">    provider<span class="token punctuation">,</span></span>
<span class="line">    authSigner<span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// 使用主网 Flashbots，需要把下面两行删去</span></span>
<span class="line">    <span class="token string">'https://relay-sepolia.flashbots.net'</span>'<span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">'sepolia'</span></span>
<span class="line">    <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>创建一笔符合 <code v-pre>EIP1559</code> 标准的交易，交易内容: 发送 0.001 ETH 测试币到 WTF Academy 地址。这里用到了钱包私钥（含资产）以及普通provider</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> privateKey <span class="token operator">=</span> <span class="token string">'0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2c'</span></span>
<span class="line"><span class="token keyword">const</span> wallet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>Wallet</span><span class="token punctuation">(</span>privateKey<span class="token punctuation">,</span> provider<span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// EIP 1559 transaction</span></span>
<span class="line"><span class="token keyword">const</span> transaction0 <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token literal-property property">chainId</span><span class="token operator">:</span> <span class="token constant">CHAIN_ID</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token literal-property property">to</span><span class="token operator">:</span> <span class="token string">"0x25df6DA2f4e5C178DdFF45038378C0b08E0Bce54"</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token literal-property property">value</span><span class="token operator">:</span> ethers<span class="token punctuation">.</span><span class="token function">parseEther</span><span class="token punctuation">(</span><span class="token string">"0.001"</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token literal-property property">maxFeePerGas</span><span class="token operator">:</span> <span class="token constant">GWEI</span> <span class="token operator">*</span> <span class="token number">100n</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token literal-property property">maxPriorityFeePerGas</span><span class="token operator">:</span> <span class="token constant">GWEI</span> <span class="token operator">*</span> <span class="token number">50n</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>创建交易Bundle，这里我们只打包了一笔交易，实际使用中可以打包多笔签名过或未签名的交易。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> transactionBundle <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">signer</span><span class="token operator">:</span> wallet<span class="token punctuation">,</span> <span class="token comment">// ethers signer</span></span>
<span class="line">        <span class="token literal-property property">transaction</span><span class="token operator">:</span> transaction0 <span class="token comment">// ethers populated transaction object</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token comment">// 也可以加入mempool中签名好的交易（可以是任何人发送的）</span></span>
<span class="line">    <span class="token comment">// ,{</span></span>
<span class="line">    <span class="token comment">//     signedTransaction: SIGNED_ORACLE_UPDATE_FROM_PENDING_POOL // serialized signed transaction hex</span></span>
<span class="line">    <span class="token comment">// }</span></span>
<span class="line"><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>模拟交易并打印交易详情。bundle 要模拟成功后才能被执行。这里用到了flashbots provider的 <code v-pre>signBundle()</code> 和 <code v-pre>simulate()</code> 方法。注意，<code v-pre>simulate()</code> 方法需要指定交易执行的目标区块高度，这里用的下一个区块。</p>
<p><img src="@source/ethers/img/25-4.png" alt=""></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// 签名交易</span></span>
<span class="line"><span class="token keyword">const</span> signedTransactions <span class="token operator">=</span> <span class="token keyword">await</span> flashbotsProvider<span class="token punctuation">.</span><span class="token function">signBundle</span><span class="token punctuation">(</span>transactionBundle<span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 设置交易的目标执行区块（在哪个区块执行）</span></span>
<span class="line"><span class="token keyword">const</span> targetBlockNumber <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">await</span> provider<span class="token punctuation">.</span><span class="token function">getBlockNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span></span>
<span class="line"><span class="token comment">// 模拟</span></span>
<span class="line"><span class="token keyword">const</span> simulation <span class="token operator">=</span> <span class="token keyword">await</span> flashbotsProvider<span class="token punctuation">.</span><span class="token function">simulate</span><span class="token punctuation">(</span>signedTransactions<span class="token punctuation">,</span> targetBlockNumber<span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 检查模拟是否成功</span></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">"error"</span> <span class="token keyword">in</span> simulation<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">模拟交易出错: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>simulation<span class="token punctuation">.</span>error<span class="token punctuation">.</span>message<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">模拟交易成功</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>simulation<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token operator">=></span></span>
<span class="line">        <span class="token keyword">typeof</span> value <span class="token operator">===</span> <span class="token string">'bigint'</span></span>
<span class="line">            <span class="token operator">?</span> value<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token operator">:</span> value<span class="token punctuation">,</span> <span class="token comment">// return everything else unchanged</span></span>
<span class="line">        <span class="token number">2</span></span>
<span class="line">    <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>发送交易 Bundle 上链。由于 Flashbots Bundle 需要指定执行的区块高度，且测试网Flashbots的节点很少，需要尝试很多次才能成功上链，所以我们用了一个循环，让 bundle 在未来的 100 个区块内依次尝试执行。我们用到了 flashbots provider 的 <code v-pre>sendRawBundle()</code> 方法发送 bundle。交易结果有三种状态：</p>
<ul>
<li><code v-pre>BundleIncluded</code>: bundle 成功上链。</li>
<li><code v-pre>BlockPassedWithoutInclusion</code>: bunddle 未成功上链，需要继续尝试。</li>
<li><code v-pre>AccountNonceTooHigh</code>: Nonce 设置有错。</li>
</ul>
<p>从下图可以看到，我们提交的 bundle 在5次尝试后成功上链。
<img src="@source/ethers/img/25-5.png" alt=""></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> targetBlockNumberNew <span class="token operator">=</span> targetBlockNumber <span class="token operator">+</span> i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token comment">// 发送交易</span></span>
<span class="line">    <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token keyword">await</span> flashbotsProvider<span class="token punctuation">.</span><span class="token function">sendRawBundle</span><span class="token punctuation">(</span>signedTransactions<span class="token punctuation">,</span> targetBlockNumberNew<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">"error"</span> <span class="token keyword">in</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>error<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token comment">// 检查交易是否上链</span></span>
<span class="line">    <span class="token keyword">const</span> bundleResolution <span class="token operator">=</span> <span class="token keyword">await</span> res<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token comment">// 交易有三个状态: 成功上链/没有上链/Nonce过高。</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>bundleResolution <span class="token operator">===</span> FlashbotsBundleResolution<span class="token punctuation">.</span>BundleIncluded<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">恭喜, 交易成功上链，区块: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>targetBlockNumberNew<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    process<span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span></span>
<span class="line">    bundleResolution <span class="token operator">===</span> FlashbotsBundleResolution<span class="token punctuation">.</span>BlockPassedWithoutInclusion</span>
<span class="line">    <span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">请重试, 交易没有被纳入区块: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>targetBlockNumberNew<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span></span>
<span class="line">    bundleResolution <span class="token operator">===</span> FlashbotsBundleResolution<span class="token punctuation">.</span>AccountNonceTooHigh</span>
<span class="line">    <span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Nonce 太高，请重新设置"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    process<span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="完整代码" tabindex="-1"><a class="header-anchor" href="#完整代码"><span>完整代码</span></a></h2>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ethers <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ethers"</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span></span>
<span class="line">    FlashbotsBundleProvider<span class="token punctuation">,</span></span>
<span class="line">    FlashbotsBundleResolution<span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@flashbots/ethers-provider-bundle"</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token constant">GWEI</span> <span class="token operator">=</span> <span class="token number">10n</span> <span class="token operator">**</span> <span class="token number">9n</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token constant">CHAIN_ID</span> <span class="token operator">=</span> <span class="token number">11155111</span><span class="token punctuation">;</span> <span class="token comment">// sepolia测试网，如果用主网，chainid 改为 1</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 1. 普通rpc （非flashbots rpc）</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token constant">ALCHEMY_GOERLI_URL</span> <span class="token operator">=</span> <span class="token string">'https://eth-sepolia.g.alchemy.com/v2/424OtGw_2L1A2wH6wrbPVPvyukI-sCoK'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> provider <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>JsonRpcProvider</span><span class="token punctuation">(</span><span class="token constant">ALCHEMY_GOERLI_URL</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 2. flashbots声誉私钥，用于建立“声誉”，详情见: https://docs.flashbots.net/flashbots-auction/searchers/advanced/reputation</span></span>
<span class="line"><span class="token comment">// !!!注意: 这个账户，不要储存资金，也不是flashbots主私钥。</span></span>
<span class="line"><span class="token keyword">const</span> authKey <span class="token operator">=</span> <span class="token string">'0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2c'</span></span>
<span class="line"><span class="token keyword">const</span> authSigner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>Wallet</span><span class="token punctuation">(</span>authKey<span class="token punctuation">,</span> provider<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">main</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 3. flashbots rpc（sepolia 测试网），用于发送交易</span></span>
<span class="line">    <span class="token keyword">const</span> flashbotsProvider <span class="token operator">=</span> <span class="token keyword">await</span> FlashbotsBundleProvider<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span></span>
<span class="line">        provider<span class="token punctuation">,</span></span>
<span class="line">        authSigner<span class="token punctuation">,</span></span>
<span class="line">        <span class="token comment">// 使用主网 Flashbots，需要把下面两行删去</span></span>
<span class="line">        <span class="token string">'https://relay-sepolia.flashbots.net'</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">'sepolia'</span></span>
<span class="line">        <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 4. 创建一笔交易</span></span>
<span class="line">    <span class="token comment">// 交易: 发送0.001 ETH测试币到 WTF Academy 地址</span></span>
<span class="line">    <span class="token keyword">const</span> privateKey <span class="token operator">=</span> <span class="token string">'0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2c'</span></span>
<span class="line">    <span class="token keyword">const</span> wallet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>Wallet</span><span class="token punctuation">(</span>privateKey<span class="token punctuation">,</span> provider<span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">// EIP 1559 transaction</span></span>
<span class="line">    <span class="token keyword">const</span> transaction0 <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">chainId</span><span class="token operator">:</span> <span class="token constant">CHAIN_ID</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">to</span><span class="token operator">:</span> <span class="token string">"0x25df6DA2f4e5C178DdFF45038378C0b08E0Bce54"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">value</span><span class="token operator">:</span> ethers<span class="token punctuation">.</span><span class="token function">parseEther</span><span class="token punctuation">(</span><span class="token string">"0.001"</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">maxFeePerGas</span><span class="token operator">:</span> <span class="token constant">GWEI</span> <span class="token operator">*</span> <span class="token number">100n</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">maxPriorityFeePerGas</span><span class="token operator">:</span> <span class="token constant">GWEI</span> <span class="token operator">*</span> <span class="token number">50n</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 5. 创建交易 Bundle</span></span>
<span class="line">    <span class="token keyword">const</span> transactionBundle <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token literal-property property">signer</span><span class="token operator">:</span> wallet<span class="token punctuation">,</span> <span class="token comment">// ethers signer</span></span>
<span class="line">            <span class="token literal-property property">transaction</span><span class="token operator">:</span> transaction0 <span class="token comment">// ethers populated transaction object</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token comment">// 也可以加入mempool中签名好的交易（可以是任何人发送的）</span></span>
<span class="line">        <span class="token comment">// ,{</span></span>
<span class="line">        <span class="token comment">//     signedTransaction: SIGNED_ORACLE_UPDATE_FROM_PENDING_POOL // serialized signed transaction hex</span></span>
<span class="line">        <span class="token comment">// }</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 6. 模拟交易，交易模拟成功后才能执行</span></span>
<span class="line">    <span class="token comment">// 签名交易</span></span>
<span class="line">    <span class="token keyword">const</span> signedTransactions <span class="token operator">=</span> <span class="token keyword">await</span> flashbotsProvider<span class="token punctuation">.</span><span class="token function">signBundle</span><span class="token punctuation">(</span>transactionBundle<span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">// 设置交易的目标执行区块（在哪个区块执行）</span></span>
<span class="line">    <span class="token keyword">const</span> targetBlockNumber <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">await</span> provider<span class="token punctuation">.</span><span class="token function">getBlockNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span></span>
<span class="line">    <span class="token comment">// 模拟</span></span>
<span class="line">    <span class="token keyword">const</span> simulation <span class="token operator">=</span> <span class="token keyword">await</span> flashbotsProvider<span class="token punctuation">.</span><span class="token function">simulate</span><span class="token punctuation">(</span>signedTransactions<span class="token punctuation">,</span> targetBlockNumber<span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">// 检查模拟是否成功</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">"error"</span> <span class="token keyword">in</span> simulation<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">模拟交易出错: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>simulation<span class="token punctuation">.</span>error<span class="token punctuation">.</span>message<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">模拟交易成功</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>simulation<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token operator">=></span></span>
<span class="line">            <span class="token keyword">typeof</span> value <span class="token operator">===</span> <span class="token string">'bigint'</span></span>
<span class="line">                <span class="token operator">?</span> value<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token operator">:</span> value<span class="token punctuation">,</span> <span class="token comment">// return everything else unchanged</span></span>
<span class="line">            <span class="token number">2</span></span>
<span class="line">        <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 7. 发送交易上链</span></span>
<span class="line">    <span class="token comment">// 因为测试网Flashbots的节点很少，需要尝试很多次才能成功上链，这里我们循环发送 100 个区块。</span></span>
<span class="line">    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">let</span> targetBlockNumberNew <span class="token operator">=</span> targetBlockNumber <span class="token operator">+</span> i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token comment">// 发送交易</span></span>
<span class="line">        <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token keyword">await</span> flashbotsProvider<span class="token punctuation">.</span><span class="token function">sendRawBundle</span><span class="token punctuation">(</span>signedTransactions<span class="token punctuation">,</span> targetBlockNumberNew<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">"error"</span> <span class="token keyword">in</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>error<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token comment">// 检查交易是否上链</span></span>
<span class="line">        <span class="token keyword">const</span> bundleResolution <span class="token operator">=</span> <span class="token keyword">await</span> res<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token comment">// 交易有三个状态: 成功上链/没有上链/Nonce过高。</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>bundleResolution <span class="token operator">===</span> FlashbotsBundleResolution<span class="token punctuation">.</span>BundleIncluded<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">恭喜, 交易成功上链，区块: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>targetBlockNumberNew<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        process<span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span></span>
<span class="line">        bundleResolution <span class="token operator">===</span> FlashbotsBundleResolution<span class="token punctuation">.</span>BlockPassedWithoutInclusion</span>
<span class="line">        <span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">请重试, 交易没有被纳入区块: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>targetBlockNumberNew<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span></span>
<span class="line">        bundleResolution <span class="token operator">===</span> FlashbotsBundleResolution<span class="token punctuation">.</span>AccountNonceTooHigh</span>
<span class="line">        <span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Nonce 太高，请重新设置"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        process<span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


