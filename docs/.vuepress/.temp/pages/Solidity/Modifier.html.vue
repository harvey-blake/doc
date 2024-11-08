<template><div><Layout/><h1 id="_11-构造函数和修饰器" tabindex="-1"><a class="header-anchor" href="#_11-构造函数和修饰器"><span>11. 构造函数和修饰器</span></a></h1>
<p>我们将用合约权限控制（<code v-pre>Ownable</code>）的例子介绍<code v-pre>Solidity</code>语言中构造函数（<code v-pre>constructor</code>）和独有的修饰器（<code v-pre>modifier</code>）。</p>
<h2 id="构造函数" tabindex="-1"><a class="header-anchor" href="#构造函数"><span>构造函数</span></a></h2>
<p>构造函数（<code v-pre>constructor</code>）是一种特殊的函数，每个合约可以定义一个，并在部署合约的时候自动运行一次。它可以用来初始化合约的一些参数，例如初始化合约的<code v-pre>owner</code>地址：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token builtin">address</span> owner<span class="token punctuation">;</span> <span class="token comment">// 定义owner变量</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 构造函数</span></span>
<span class="line"><span class="token keyword">constructor</span><span class="token punctuation">(</span><span class="token builtin">address</span> initialOwner<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    owner <span class="token operator">=</span> initialOwner<span class="token punctuation">;</span> <span class="token comment">// 在部署合约的时候，将owner设置为传入的initialOwner地址</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意</strong>：构造函数在不同的Solidity版本中的语法并不一致，在Solidity 0.4.22之前，构造函数不使用 <code v-pre>constructor</code> 而是使用与合约名同名的函数作为构造函数而使用，由于这种旧写法容易使开发者在书写时发生疏漏（例如合约名叫 <code v-pre>Parents</code>，构造函数名写成 <code v-pre>parents</code>），使得构造函数变成普通函数，引发漏洞，所以0.4.22版本及之后，采用了全新的 <code v-pre>constructor</code> 写法。</p>
<p>构造函数的旧写法代码示例：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">pragma</span> <span class="token keyword">solidity</span> <span class="token operator">=</span><span class="token number">0.4</span><span class="token number">.21</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">Parents</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 与合约名Parents同名的函数就是构造函数</span></span>
<span class="line">    <span class="token keyword">function</span> Parents <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修饰器" tabindex="-1"><a class="header-anchor" href="#修饰器"><span>修饰器</span></a></h2>
<p>修饰器（<code v-pre>modifier</code>）是<code v-pre>Solidity</code>特有的语法，类似于面向对象编程中的装饰器（<code v-pre>decorator</code>），声明函数拥有的特性，并减少代码冗余。它就像钢铁侠的智能盔甲，穿上它的函数会带有某些特定的行为。<code v-pre>modifier</code>的主要使用场景是运行函数前的检查，例如地址，变量，余额等。</p>
<p><img src="https://images.mirror-media.xyz/publication-images/nVwXsOVmrYu8rqvKKPMpg.jpg?height=630&amp;width=1200" alt="钢铁侠的modifier"></p>
<p>我们来定义一个叫做onlyOwner的modifier：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// 定义modifier</span></span>
<span class="line"><span class="token keyword">modifier</span> onlyOwner <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">require</span><span class="token punctuation">(</span>msg<span class="token punctuation">.</span>sender <span class="token operator">==</span> owner<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 检查调用者是否为owner地址</span></span>
<span class="line">   <span class="token keyword">_</span><span class="token punctuation">;</span> <span class="token comment">// 如果是的话，继续运行函数主体；否则报错并revert交易</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>带有<code v-pre>onlyOwner</code>修饰符的函数只能被<code v-pre>owner</code>地址调用，比如下面这个例子：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">changeOwner</span><span class="token punctuation">(</span><span class="token builtin">address</span> _newOwner<span class="token punctuation">)</span> <span class="token keyword">external</span> onlyOwner<span class="token punctuation">{</span></span>
<span class="line">   owner <span class="token operator">=</span> _newOwner<span class="token punctuation">;</span> <span class="token comment">// 只有owner地址运行这个函数，并改变owner</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们定义了一个<code v-pre>changeOwner</code>函数，运行它可以改变合约的<code v-pre>owner</code>，但是由于<code v-pre>onlyOwner</code>修饰符的存在，只有原先的<code v-pre>owner</code>可以调用，别人调用就会报错。这也是最常用的控制智能合约权限的方法。</p>
<h3 id="openzeppelin的ownable标准实现" tabindex="-1"><a class="header-anchor" href="#openzeppelin的ownable标准实现"><span>OpenZeppelin的Ownable标准实现</span></a></h3>
<p><code v-pre>OpenZeppelin</code>是一个维护<code v-pre>Solidity</code>标准化代码库的组织，他的<code v-pre>Ownable</code>标准实现如下：
<a href="https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol" target="_blank" rel="noopener noreferrer">https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol</a></p>
<h2 id="remix-演示示例" tabindex="-1"><a class="header-anchor" href="#remix-演示示例"><span>Remix 演示示例</span></a></h2>
<p>以 <code v-pre>Owner.sol</code> 为例。</p>
<ol>
<li>
<p>在 Remix 上编译并部署代码,在合约部署时传入 initialOwner 变量。</p>
<p><img src="@source/Solidity/img/11-1.jpg" alt="11-1"></p>
</li>
<li>
<p>点击 <code v-pre>owner</code> 按钮查看当前 owner 变量。</p>
<p><img src="@source/Solidity/img/11-2.jpg" alt="11-2"></p>
</li>
<li>
<p>以 owner 地址的用户身份，调用 <code v-pre>changeOwner</code> 函数，交易成功。</p>
<p><img src="@source/Solidity/img/11-3.jpg" alt="11-3"></p>
</li>
<li>
<p>以非 owner 地址的用户身份，调用 <code v-pre>changeOwner</code> 函数，交易失败，因为modifier onlyOwner 的检查语句不满足。</p>
<p><img src="@source/Solidity/img/11-4.jpg" alt="11-4"></p>
</li>
</ol>
<h2 id="完整合约" tabindex="-1"><a class="header-anchor" href="#完整合约"><span>完整合约</span></a></h2>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// SPDX-License-Identifier: MIT</span></span>
<span class="line"><span class="token keyword">pragma</span> <span class="token keyword">solidity</span> <span class="token operator">^</span><span class="token version number">0.8.21</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">Owner</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token builtin">address</span> <span class="token keyword">public</span> owner<span class="token punctuation">;</span> <span class="token comment">// 定义owner变量</span></span>
<span class="line"></span>
<span class="line">   <span class="token comment">// 构造函数</span></span>
<span class="line">   <span class="token keyword">constructor</span><span class="token punctuation">(</span><span class="token builtin">address</span> initialOwner<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      owner <span class="token operator">=</span> initialOwner<span class="token punctuation">;</span> <span class="token comment">// 在部署合约的时候，将owner设置为传入的initialOwner地址</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">   <span class="token comment">// 定义modifier</span></span>
<span class="line">   <span class="token keyword">modifier</span> onlyOwner <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">require</span><span class="token punctuation">(</span>msg<span class="token punctuation">.</span>sender <span class="token operator">==</span> owner<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 检查调用者是否为owner地址</span></span>
<span class="line">      <span class="token keyword">_</span><span class="token punctuation">;</span> <span class="token comment">// 如果是的话，继续运行函数主体；否则报错并revert交易</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">   <span class="token comment">// 定义一个带onlyOwner修饰符的函数</span></span>
<span class="line">   <span class="token keyword">function</span> <span class="token function">changeOwner</span><span class="token punctuation">(</span><span class="token builtin">address</span> _newOwner<span class="token punctuation">)</span> <span class="token keyword">external</span> onlyOwner<span class="token punctuation">{</span></span>
<span class="line">      owner <span class="token operator">=</span> _newOwner<span class="token punctuation">;</span> <span class="token comment">// 只有owner地址运行这个函数，并改变owner</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


