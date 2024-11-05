<template><div><h1 id="_22-读取任意数据" tabindex="-1"><a class="header-anchor" href="#_22-读取任意数据"><span>22. 读取任意数据</span></a></h1>
<p>以太坊所有数据都是公开的，因此 <code v-pre>private</code> 变量并不私密。这一讲，我们将介绍如何读取智能合约的任意数据。</p>
<h2 id="智能合约存储布局" tabindex="-1"><a class="header-anchor" href="#智能合约存储布局"><span>智能合约存储布局</span></a></h2>
<p>以太坊智能合约的存储是一个 <code v-pre>uint256 -&gt; uint256</code> 的映射。<code v-pre>uint256</code> 大小为 <code v-pre>32 bytes</code>，这个固定大小的存储空间被称为 <code v-pre>slot</code> （插槽）。智能合约的数据就被存在一个个的 <code v-pre>slot</code> 中，从 <code v-pre>slot 0</code> 开始依次存储。每个基本数据类型占一个<code v-pre>slot</code>，例如<code v-pre>uint</code>，<code v-pre>address</code>，等等；而数组和映射这类复杂结构则会更复杂，详见<a href="https://docs.soliditylang.org/en/v0.8.17/internals/layout_in_storage.html?highlight=Layout%20of%20State%20Variables%20in%20Storage" target="_blank" rel="noopener noreferrer">网址</a>。</p>
<p><img src="@source/ethers/img/22-1.png" alt=""></p>
<p>因此，即使是没有 <code v-pre>getter</code> 函数的 <code v-pre>private</code> 变量，你依然可以通过 <code v-pre>slot</code> 索引来读取它的值。</p>
<h2 id="getstorageat" tabindex="-1"><a class="header-anchor" href="#getstorageat"><span><code v-pre>getStorageAt</code></span></a></h2>
<p><code v-pre>ethersjs</code> 提供了 <code v-pre>getStorageAt()</code> 方便开发者读取特定 <code v-pre>slot</code> 的值：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token keyword">await</span> provider<span class="token punctuation">.</span><span class="token function">getStorageAt</span><span class="token punctuation">(</span>contractAddress<span class="token punctuation">,</span> slot<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><code v-pre>getStorageAt()</code> 有两个参数，分别是合约地址 <code v-pre>contractAddress</code> 和 想读取变量的 <code v-pre>slot</code> 索引。</p>
<h2 id="读取任意数据脚本" tabindex="-1"><a class="header-anchor" href="#读取任意数据脚本"><span>读取任意数据脚本</span></a></h2>
<p>下面，我们写一个脚本，利用 <code v-pre>getStorageAt()</code> 函数来读取 <code v-pre>Arbitrum</code> 跨链桥的合约所有者。该跨链桥为可升级代理合约，将 <code v-pre>owner</code> 存在了特定的 <code v-pre>slot</code> 避免发生变量碰撞，并且没有读取它的函数。这里，我们就可以利用<code v-pre>getStorageAt()</code> 来读取它。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line">合约地址<span class="token punctuation">:</span> <span class="token number">0x8315177aB297bA92A06054cE80a67Ed4DBd7ed3a</span></span>
<span class="line">slot索引<span class="token punctuation">:</span> <span class="token number">0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果：</p>
<p><img src="@source/ethers/img/22-2.png" alt=""></p>
<p>代码：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ethers <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ethers"</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token constant">ALCHEMY_MAINNET_URL</span> <span class="token operator">=</span> <span class="token string">'https://eth-mainnet.g.alchemy.com/v2/oKmOQKbneVkxgHZfibs-iFhIlIAl6HDN'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> provider <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>JsonRpcProvider</span><span class="token punctuation">(</span><span class="token constant">ALCHEMY_MAINNET_URL</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 目标合约地址: Arbitrum ERC20 bridge（主网）</span></span>
<span class="line"><span class="token keyword">const</span> addressBridge <span class="token operator">=</span> <span class="token string">'0x8315177aB297bA92A06054cE80a67Ed4DBd7ed3a'</span> <span class="token comment">// DAI Contract</span></span>
<span class="line"><span class="token comment">// 合约所有者 slot</span></span>
<span class="line"><span class="token keyword">const</span> slot <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103</span><span class="token template-punctuation string">`</span></span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">main</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"开始读取特定slot的数据"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">const</span> privateData <span class="token operator">=</span> <span class="token keyword">await</span> provider<span class="token punctuation">.</span><span class="token function">getStorage</span><span class="token punctuation">(</span>addressBridge<span class="token punctuation">,</span> slot<span class="token punctuation">)</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"读出的数据（owner地址）: "</span><span class="token punctuation">,</span> ethers<span class="token punctuation">.</span><span class="token function">getAddress</span><span class="token punctuation">(</span>ethers<span class="token punctuation">.</span><span class="token function">dataSlice</span><span class="token punctuation">(</span>privateData<span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


