<template><div><h1 id="_9-常数-constant和immutable" tabindex="-1"><a class="header-anchor" href="#_9-常数-constant和immutable"><span>9. 常数 constant和immutable</span></a></h1>
<p>介绍Solidity中和常量相关的两个关键字，<code v-pre>constant</code>（常量）和<code v-pre>immutable</code>（不变量）。状态变量声明这两个关键字之后，不能在初始化后更改数值。这样做的好处是提升合约的安全性并节省<code v-pre>gas</code>。</p>
<p>另外，只有数值变量可以声明<code v-pre>constant</code>和<code v-pre>immutable</code>；<code v-pre>string</code>和<code v-pre>bytes</code>可以声明为<code v-pre>constant</code>，但不能为<code v-pre>immutable</code>。</p>
<h2 id="constant和immutable" tabindex="-1"><a class="header-anchor" href="#constant和immutable"><span>constant和immutable</span></a></h2>
<h3 id="constant" tabindex="-1"><a class="header-anchor" href="#constant"><span>constant</span></a></h3>
<p><code v-pre>constant</code>变量必须在声明的时候初始化，之后再也不能改变。尝试改变的话，编译不通过。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// constant变量必须在声明的时候初始化，之后不能改变</span></span>
<span class="line"><span class="token builtin">uint256</span> <span class="token keyword">constant</span> CONSTANT_NUM <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token builtin">string</span> <span class="token keyword">constant</span> CONSTANT_STRING <span class="token operator">=</span> <span class="token string">"0xAA"</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token builtin">bytes</span> <span class="token keyword">constant</span> CONSTANT_BYTES <span class="token operator">=</span> <span class="token string">"WTF"</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token builtin">address</span> <span class="token keyword">constant</span> CONSTANT_ADDRESS <span class="token operator">=</span> <span class="token number">0x0000000000000000000000000000000000000000</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="immutable" tabindex="-1"><a class="header-anchor" href="#immutable"><span>immutable</span></a></h3>
<p><code v-pre>immutable</code>变量可以在声明时或构造函数中初始化，因此更加灵活。在<code v-pre>Solidity v0.8.21</code>以后，<code v-pre>immutable</code>变量不需要显式初始化，未显式初始化的<code v-pre>immutable</code>变量将使用数值类型的初始值（见 <RouteLink to="/Solidity/InitialValue.html">8. 变量初始值</RouteLink>）。反之，则需要显式初始化。
若<code v-pre>immutable</code>变量既在声明时初始化，又在constructor中初始化，会使用constructor初始化的值。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// immutable变量可以在constructor里初始化，之后不能改变</span></span>
<span class="line"><span class="token builtin">uint256</span> <span class="token keyword">public</span> immutable IMMUTABLE_NUM <span class="token operator">=</span> <span class="token number">9999999999</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// 在`Solidity v8.0.21`以后,下列变量数值暂为初始值</span></span>
<span class="line"><span class="token builtin">address</span> <span class="token keyword">public</span> immutable IMMUTABLE_ADDRESS<span class="token punctuation">;</span></span>
<span class="line"><span class="token builtin">uint256</span> <span class="token keyword">public</span> immutable IMMUTABLE_BLOCK<span class="token punctuation">;</span></span>
<span class="line"><span class="token builtin">uint256</span> <span class="token keyword">public</span> immutable IMMUTABLE_TEST<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以使用全局变量例如<code v-pre>address(this)</code>，<code v-pre>block.number</code> 或者自定义的函数给<code v-pre>immutable</code>变量初始化。在下面这个例子，我们利用了<code v-pre>test()</code>函数给<code v-pre>IMMUTABLE_TEST</code>初始化为<code v-pre>9</code>：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// 利用constructor初始化immutable变量，因此可以利用</span></span>
<span class="line"><span class="token keyword">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    IMMUTABLE_ADDRESS <span class="token operator">=</span> <span class="token builtin">address</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    IMMUTABLE_NUM <span class="token operator">=</span> <span class="token number">1118</span><span class="token punctuation">;</span></span>
<span class="line">    IMMUTABLE_TEST <span class="token operator">=</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint256</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin">uint256</span> what <span class="token operator">=</span> <span class="token number">9</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span><span class="token punctuation">(</span>what<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在remix上验证" tabindex="-1"><a class="header-anchor" href="#在remix上验证"><span>在remix上验证</span></a></h2>
<ol>
<li>
<p>部署好合约之后，通过remix上的<code v-pre>getter</code>函数，能获取到<code v-pre>constant</code>和<code v-pre>immutable</code>变量初始化好的值。</p>
<p><img src="@source/Solidity/img/9-1.png" alt="9-1.png"></p>
</li>
<li>
<p><code v-pre>constant</code>变量初始化之后，尝试改变它的值，会编译不通过并抛出<code v-pre>TypeError: Cannot assign to a constant variable.</code>的错误。</p>
<p><img src="@source/Solidity/img/9-2.png" alt="9-2.png"></p>
</li>
<li>
<p><code v-pre>immutable</code>变量初始化之后，尝试改变它的值，会编译不通过并抛出<code v-pre>TypeError: Immutable state variable already initialized.</code>的错误。</p>
<p><img src="@source/Solidity/img/9-3.png" alt="9-3.png"></p>
</li>
</ol>
<h2 id="完整合约" tabindex="-1"><a class="header-anchor" href="#完整合约"><span>完整合约</span></a></h2>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// SPDX-License-Identifier: MIT</span></span>
<span class="line"><span class="token keyword">pragma</span> <span class="token keyword">solidity</span> <span class="token operator">^</span><span class="token version number">0.8.21</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">Constant</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// constant变量必须在声明的时候初始化，之后不能改变</span></span>
<span class="line">    <span class="token builtin">uint256</span> <span class="token keyword">public</span> <span class="token keyword">constant</span> CONSTANT_NUM <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">string</span> <span class="token keyword">public</span> <span class="token keyword">constant</span> CONSTANT_STRING <span class="token operator">=</span> <span class="token string">"0xAA"</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">bytes</span> <span class="token keyword">public</span> <span class="token keyword">constant</span> CONSTANT_BYTES <span class="token operator">=</span> <span class="token string">"WTF"</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">address</span> <span class="token keyword">public</span> <span class="token keyword">constant</span> CONSTANT_ADDRESS <span class="token operator">=</span> <span class="token number">0x0000000000000000000000000000000000000000</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// immutable变量可以在constructor里初始化，之后不能改变</span></span>
<span class="line">    <span class="token builtin">uint256</span> <span class="token keyword">public</span> immutable IMMUTABLE_NUM <span class="token operator">=</span> <span class="token number">9999999999</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">address</span> <span class="token keyword">public</span> immutable IMMUTABLE_ADDRESS<span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">uint256</span> <span class="token keyword">public</span> immutable IMMUTABLE_BLOCK<span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">uint256</span> <span class="token keyword">public</span> immutable IMMUTABLE_TEST<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 利用constructor初始化immutable变量，因此可以利用</span></span>
<span class="line">    <span class="token keyword">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        IMMUTABLE_ADDRESS <span class="token operator">=</span> <span class="token builtin">address</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        IMMUTABLE_NUM <span class="token operator">=</span> <span class="token number">1118</span><span class="token punctuation">;</span></span>
<span class="line">        IMMUTABLE_TEST <span class="token operator">=</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint256</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token builtin">uint256</span> what <span class="token operator">=</span> <span class="token number">9</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">return</span><span class="token punctuation">(</span>what<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


