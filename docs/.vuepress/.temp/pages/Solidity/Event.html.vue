<template><div><Layout/><h1 id="_12-事件" tabindex="-1"><a class="header-anchor" href="#_12-事件"><span>12. 事件</span></a></h1>
<p>我们用转账ERC20代币为例来介绍<code v-pre>Solidity</code>中的事件（<code v-pre>event</code>）。</p>
<h2 id="事件" tabindex="-1"><a class="header-anchor" href="#事件"><span>事件</span></a></h2>
<p><code v-pre>Solidity</code>中的事件（<code v-pre>event</code>）是<code v-pre>EVM</code>上日志的抽象，它具有两个特点：</p>
<ul>
<li>响应：应用程序（<a href="https://learnblockchain.cn/docs/ethers.js/api-contract.html#id18" target="_blank" rel="noopener noreferrer"><code v-pre>ethers.js</code></a>）可以通过<code v-pre>RPC</code>接口订阅和监听这些事件，并在前端做响应。</li>
<li>经济：事件是<code v-pre>EVM</code>上比较经济的存储数据的方式，每个大概消耗2,000 <code v-pre>gas</code>；相比之下，链上存储一个新变量至少需要20,000 <code v-pre>gas</code>。</li>
</ul>
<h3 id="声明事件" tabindex="-1"><a class="header-anchor" href="#声明事件"><span>声明事件</span></a></h3>
<p>事件的声明由<code v-pre>event</code>关键字开头，接着是事件名称，括号里面写好事件需要记录的变量类型和变量名。以<code v-pre>ERC20</code>代币合约的<code v-pre>Transfer</code>事件为例：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">event</span> <span class="token function">Transfer</span><span class="token punctuation">(</span><span class="token builtin">address</span> <span class="token keyword">indexed</span> <span class="token keyword">from</span><span class="token punctuation">,</span> <span class="token builtin">address</span> <span class="token keyword">indexed</span> to<span class="token punctuation">,</span> <span class="token builtin">uint256</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>我们可以看到，<code v-pre>Transfer</code>事件共记录了3个变量<code v-pre>from</code>，<code v-pre>to</code>和<code v-pre>value</code>，分别对应代币的转账地址，接收地址和转账数量，其中<code v-pre>from</code>和<code v-pre>to</code>前面带有<code v-pre>indexed</code>关键字，他们会保存在以太坊虚拟机日志的<code v-pre>topics</code>中，方便之后检索。</p>
<h3 id="释放事件" tabindex="-1"><a class="header-anchor" href="#释放事件"><span>释放事件</span></a></h3>
<p>我们可以在函数里释放事件。在下面的例子中，每次用<code v-pre>_transfer()</code>函数进行转账操作的时候，都会释放<code v-pre>Transfer</code>事件，并记录相应的变量。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// 定义_transfer函数，执行转账逻辑</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">_transfer</span><span class="token punctuation">(</span></span>
<span class="line">    <span class="token builtin">address</span> <span class="token keyword">from</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token builtin">address</span> to<span class="token punctuation">,</span></span>
<span class="line">    <span class="token builtin">uint256</span> amount</span>
<span class="line"><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    _balances<span class="token punctuation">[</span><span class="token keyword">from</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">10000000</span><span class="token punctuation">;</span> <span class="token comment">// 给转账地址一些初始代币</span></span>
<span class="line"></span>
<span class="line">    _balances<span class="token punctuation">[</span><span class="token keyword">from</span><span class="token punctuation">]</span> <span class="token operator">-=</span>  amount<span class="token punctuation">;</span> <span class="token comment">// from地址减去转账数量</span></span>
<span class="line">    _balances<span class="token punctuation">[</span>to<span class="token punctuation">]</span> <span class="token operator">+=</span> amount<span class="token punctuation">;</span> <span class="token comment">// to地址加上转账数量</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 释放事件</span></span>
<span class="line">    <span class="token keyword">emit</span> <span class="token function">Transfer</span><span class="token punctuation">(</span><span class="token keyword">from</span><span class="token punctuation">,</span> to<span class="token punctuation">,</span> amount<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="evm日志-log" tabindex="-1"><a class="header-anchor" href="#evm日志-log"><span>EVM日志 <code v-pre>Log</code></span></a></h2>
<p>以太坊虚拟机（EVM）用日志<code v-pre>Log</code>来存储<code v-pre>Solidity</code>事件，每条日志记录都包含主题<code v-pre>topics</code>和数据<code v-pre>data</code>两部分。</p>
<p><img src="@source/Solidity/img/12-3.png" alt="12-3"></p>
<h3 id="主题-topics" tabindex="-1"><a class="header-anchor" href="#主题-topics"><span>主题 <code v-pre>topics</code></span></a></h3>
<p>日志的第一部分是主题数组，用于描述事件，长度不能超过<code v-pre>4</code>。它的第一个元素是事件的签名（哈希）。对于上面的<code v-pre>Transfer</code>事件，它的事件哈希就是：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token function">keccak256</span><span class="token punctuation">(</span><span class="token string">"Transfer(address,address,uint256)"</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">//0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了事件哈希，主题还可以包含至多<code v-pre>3</code>个<code v-pre>indexed</code>参数，也就是<code v-pre>Transfer</code>事件中的<code v-pre>from</code>和<code v-pre>to</code>。</p>
<p><code v-pre>indexed</code>标记的参数可以理解为检索事件的索引“键”，方便之后搜索。每个 <code v-pre>indexed</code> 参数的大小为固定的256比特，如果参数太大了（比如字符串），就会自动计算哈希存储在主题中。</p>
<p>这里其实会引入一个新的问题，根据Solidity的<a href="https://docs.soliditylang.org/en/v0.8.27/abi-spec.html#encoding-of-indexed-event-parameters" target="_blank" rel="noopener noreferrer">官方文档</a>, 对于非值类型的参数（如arrays, bytes, strings）, Solidity不会直接存储，而是会将<code v-pre>Keccak-256</code>哈希存储在主题中，从而导致数据信息的丢失。这对于某些依赖于链上事件的DAPP（跨链，用户注册等等）来说，可能会导致事件检索困难，需要解析哈希值。</p>
<h3 id="数据-data" tabindex="-1"><a class="header-anchor" href="#数据-data"><span>数据 <code v-pre>data</code></span></a></h3>
<p>事件中不带 <code v-pre>indexed</code>的参数会被存储在 <code v-pre>data</code> 部分中，可以理解为事件的“值”。<code v-pre>data</code> 部分的变量不能被直接检索，但可以存储任意大小的数据。因此一般 <code v-pre>data</code> 部分可以用来存储复杂的数据结构，例如数组和字符串等等，因为这些数据超过了256比特，即使存储在事件的 <code v-pre>topics</code> 部分中，也是以哈希的方式存储。另外，<code v-pre>data</code> 部分的变量在存储上消耗的gas相比于 <code v-pre>topics</code> 更少。</p>
<h2 id="remix演示" tabindex="-1"><a class="header-anchor" href="#remix演示"><span><code v-pre>Remix</code>演示</span></a></h2>
<p>以 <code v-pre>Event.sol</code> 合约为例，编译部署。</p>
<p>然后调用 <code v-pre>_transfer</code> 函数。</p>
<p><img src="@source/Solidity/img/12-1.jpg" alt="12-1"></p>
<p>点击右侧的交易查看详情，可以看到日志的具体内容。</p>
<p><img src="@source/Solidity/img/12-2.jpg" alt="12-2"></p>
<h3 id="在etherscan上查询事件" tabindex="-1"><a class="header-anchor" href="#在etherscan上查询事件"><span>在Etherscan上查询事件</span></a></h3>
<p>我们尝试用<code v-pre>_transfer()</code>函数在<code v-pre>Sepolia</code>测试网络上转账100代币，可以在<code v-pre>Etherscan</code>上查询到相应的<code v-pre>tx</code>：<a href="https://sepolia.etherscan.io/tx/0xb07dcd9943662e2e8b17c7add370f046401962ce24d0690a61bb249a385dc8c9#eventlog" target="_blank" rel="noopener noreferrer">网址</a>。</p>
<p>点击<code v-pre>Logs</code>按钮，就能看到事件明细：</p>
<p><img src="@source/Solidity/img/12-4.png" alt="Event明细"></p>
<p><code v-pre>Topics</code>里面有三个元素，<code v-pre>[0]</code>是这个事件的哈希，<code v-pre>[1]</code>和<code v-pre>[2]</code>是我们定义的两个<code v-pre>indexed</code>变量的信息，即转账的转出地址和接收地址。<code v-pre>Data</code>里面是剩下的不带<code v-pre>indexed</code>的变量，也就是转账数量。</p>
<h2 id="完整合约" tabindex="-1"><a class="header-anchor" href="#完整合约"><span>完整合约</span></a></h2>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// SPDX-License-Identifier: MIT</span></span>
<span class="line"><span class="token keyword">pragma</span> <span class="token keyword">solidity</span> <span class="token operator">^</span><span class="token version number">0.8.21</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">Events</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 定义_balances映射变量，记录每个地址的持币数量</span></span>
<span class="line">    <span class="token keyword">mapping</span><span class="token punctuation">(</span><span class="token builtin">address</span> <span class="token operator">=></span> <span class="token builtin">uint256</span><span class="token punctuation">)</span> <span class="token keyword">public</span> _balances<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 定义Transfer event，记录transfer交易的转账地址，接收地址和转账数量</span></span>
<span class="line">    <span class="token keyword">event</span> <span class="token function">Transfer</span><span class="token punctuation">(</span><span class="token builtin">address</span> <span class="token keyword">indexed</span> <span class="token keyword">from</span><span class="token punctuation">,</span> <span class="token builtin">address</span> <span class="token keyword">indexed</span> to<span class="token punctuation">,</span> <span class="token builtin">uint256</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 定义_transfer函数，执行转账逻辑</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">_transfer</span><span class="token punctuation">(</span></span>
<span class="line">        <span class="token builtin">address</span> <span class="token keyword">from</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token builtin">address</span> to<span class="token punctuation">,</span></span>
<span class="line">        <span class="token builtin">uint256</span> amount</span>
<span class="line">    <span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">        _balances<span class="token punctuation">[</span><span class="token keyword">from</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">10000000</span><span class="token punctuation">;</span> <span class="token comment">// 给转账地址一些初始代币</span></span>
<span class="line"></span>
<span class="line">        _balances<span class="token punctuation">[</span><span class="token keyword">from</span><span class="token punctuation">]</span> <span class="token operator">-=</span>  amount<span class="token punctuation">;</span> <span class="token comment">// from地址减去转账数量</span></span>
<span class="line">        _balances<span class="token punctuation">[</span>to<span class="token punctuation">]</span> <span class="token operator">+=</span> amount<span class="token punctuation">;</span> <span class="token comment">// to地址加上转账数量</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// 释放事件</span></span>
<span class="line">        <span class="token keyword">emit</span> <span class="token function">Transfer</span><span class="token punctuation">(</span><span class="token keyword">from</span><span class="token punctuation">,</span> to<span class="token punctuation">,</span> amount<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


