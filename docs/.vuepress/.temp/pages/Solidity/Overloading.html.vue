<template><div><h1 id="_16-函数重载" tabindex="-1"><a class="header-anchor" href="#_16-函数重载"><span>16. 函数重载</span></a></h1>
<h2 id="重载" tabindex="-1"><a class="header-anchor" href="#重载"><span>重载</span></a></h2>
<p><code v-pre>Solidity</code>中允许函数进行重载（<code v-pre>overloading</code>），即名字相同但输入参数类型不同的函数可以同时存在，他们被视为不同的函数。注意，<code v-pre>Solidity</code>不允许修饰器（<code v-pre>modifier</code>）重载。</p>
<h3 id="函数重载" tabindex="-1"><a class="header-anchor" href="#函数重载"><span>函数重载</span></a></h3>
<p>举个例子，我们可以定义两个都叫<code v-pre>saySomething()</code>的函数，一个没有任何参数，输出<code v-pre>&quot;Nothing&quot;</code>；另一个接收一个<code v-pre>string</code>参数，输出这个<code v-pre>string</code>。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">saySomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">string</span> <span class="token keyword">memory</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span><span class="token punctuation">(</span><span class="token string">"Nothing"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">saySomething</span><span class="token punctuation">(</span><span class="token builtin">string</span> <span class="token keyword">memory</span> something<span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">string</span> <span class="token keyword">memory</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span><span class="token punctuation">(</span>something<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终重载函数在经过编译器编译后，由于不同的参数类型，都变成了不同的函数选择器（selector）。</p>
<p>以 <code v-pre>Overloading.sol</code> 合约为例，在 Remix 上编译部署后，分别调用重载函数 <code v-pre>saySomething()</code> 和 <code v-pre>saySomething(string memory something)</code>，可以看到他们返回了不同的结果，被区分为不同的函数。</p>
<p><img src="@source/Solidity/img/16-1.jpg" alt="16-1.jpg"></p>
<h3 id="实参匹配-argument-matching" tabindex="-1"><a class="header-anchor" href="#实参匹配-argument-matching"><span>实参匹配（Argument Matching）</span></a></h3>
<p>在调用重载函数时，会把输入的实际参数和函数参数的变量类型做匹配。
如果出现多个匹配的重载函数，则会报错。下面这个例子有两个叫<code v-pre>f()</code>的函数，一个参数为<code v-pre>uint8</code>，另一个为<code v-pre>uint256</code>：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token builtin">uint8</span> _in<span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token builtin">uint8</span> out<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    out <span class="token operator">=</span> _in<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token builtin">uint256</span> _in<span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token builtin">uint256</span> out<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    out <span class="token operator">=</span> _in<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们调用<code v-pre>f(50)</code>，因为<code v-pre>50</code>既可以被转换为<code v-pre>uint8</code>，也可以被转换为<code v-pre>uint256</code>，因此会报错。</p>
<h2 id="完整合约" tabindex="-1"><a class="header-anchor" href="#完整合约"><span>完整合约</span></a></h2>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"></span>
<span class="line"><span class="token comment">// SPDX-License-Identifier: MIT</span></span>
<span class="line"><span class="token keyword">pragma</span> <span class="token keyword">solidity</span> <span class="token operator">^</span><span class="token version number">0.8.21</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">contract</span> <span class="token class-name">Overload</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">saySomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">string</span> <span class="token keyword">memory</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span><span class="token punctuation">(</span><span class="token string">"Nothing"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">saySomething</span><span class="token punctuation">(</span><span class="token builtin">string</span> <span class="token keyword">memory</span> something<span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">string</span> <span class="token keyword">memory</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span><span class="token punctuation">(</span>something<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token builtin">uint8</span> _in<span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token builtin">uint8</span> out<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        out <span class="token operator">=</span> _in<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token builtin">uint256</span> _in<span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token builtin">uint256</span> out<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        out <span class="token operator">=</span> _in<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


