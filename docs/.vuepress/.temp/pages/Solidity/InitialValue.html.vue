<template><div><h1 id="_8-变量初始值" tabindex="-1"><a class="header-anchor" href="#_8-变量初始值"><span>8. 变量初始值</span></a></h1>
<hr>
<h2 id="变量初始值" tabindex="-1"><a class="header-anchor" href="#变量初始值"><span>变量初始值</span></a></h2>
<p>在<code v-pre>Solidity</code>中，声明但没赋值的变量都有它的初始值或默认值。这一讲，我们将介绍常用变量的初始值。</p>
<h3 id="值类型初始值" tabindex="-1"><a class="header-anchor" href="#值类型初始值"><span>值类型初始值</span></a></h3>
<ul>
<li><code v-pre>boolean</code>: <code v-pre>false</code></li>
<li><code v-pre>string</code>: <code v-pre>&quot;&quot;</code></li>
<li><code v-pre>int</code>: <code v-pre>0</code></li>
<li><code v-pre>uint</code>: <code v-pre>0</code></li>
<li><code v-pre>enum</code>: 枚举中的第一个元素</li>
<li><code v-pre>address</code>: <code v-pre>0x0000000000000000000000000000000000000000</code> (或 <code v-pre>address(0)</code>)</li>
<li><code v-pre>function</code>
<ul>
<li><code v-pre>internal</code>: 空白函数</li>
<li><code v-pre>external</code>: 空白函数</li>
</ul>
</li>
</ul>
<p>可以用<code v-pre>public</code>变量的<code v-pre>getter</code>函数验证上面写的初始值是否正确：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token builtin">bool</span> <span class="token keyword">public</span> _bool<span class="token punctuation">;</span> <span class="token comment">// false</span></span>
<span class="line"><span class="token builtin">string</span> <span class="token keyword">public</span> _string<span class="token punctuation">;</span> <span class="token comment">// ""</span></span>
<span class="line"><span class="token builtin">int</span> <span class="token keyword">public</span> _int<span class="token punctuation">;</span> <span class="token comment">// 0</span></span>
<span class="line"><span class="token builtin">uint</span> <span class="token keyword">public</span> _uint<span class="token punctuation">;</span> <span class="token comment">// 0</span></span>
<span class="line"><span class="token builtin">address</span> <span class="token keyword">public</span> _address<span class="token punctuation">;</span> <span class="token comment">// 0x0000000000000000000000000000000000000000</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">enum</span> <span class="token class-name">ActionSet</span> <span class="token punctuation">{</span> Buy<span class="token punctuation">,</span> Hold<span class="token punctuation">,</span> Sell<span class="token punctuation">}</span></span>
<span class="line">ActionSet <span class="token keyword">public</span> _enum<span class="token punctuation">;</span> <span class="token comment">// 第1个内容Buy的索引0</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">fi</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">internal</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// internal空白函数</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">fe</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// external空白函数</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="引用类型初始值" tabindex="-1"><a class="header-anchor" href="#引用类型初始值"><span>引用类型初始值</span></a></h3>
<ul>
<li>映射<code v-pre>mapping</code>: 所有元素都为其默认值的<code v-pre>mapping</code></li>
<li>结构体<code v-pre>struct</code>: 所有成员设为其默认值的结构体</li>
<li>数组<code v-pre>array</code>
<ul>
<li>动态数组: <code v-pre>[]</code></li>
<li>静态数组（定长）: 所有成员设为其默认值的静态数组</li>
</ul>
</li>
</ul>
<p>可以用<code v-pre>public</code>变量的<code v-pre>getter</code>函数验证上面写的初始值是否正确：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// Reference Types</span></span>
<span class="line"><span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span> <span class="token keyword">public</span> _staticArray<span class="token punctuation">;</span> <span class="token comment">// 所有成员设为其默认值的静态数组[0,0,0,0,0,0,0,0]</span></span>
<span class="line"><span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">public</span> _dynamicArray<span class="token punctuation">;</span> <span class="token comment">// `[]`</span></span>
<span class="line"><span class="token keyword">mapping</span><span class="token punctuation">(</span><span class="token builtin">uint</span> <span class="token operator">=></span> <span class="token builtin">address</span><span class="token punctuation">)</span> <span class="token keyword">public</span> _mapping<span class="token punctuation">;</span> <span class="token comment">// 所有元素都为其默认值的mapping</span></span>
<span class="line"><span class="token comment">// 所有成员设为其默认值的结构体 0, 0</span></span>
<span class="line"><span class="token keyword">struct</span> <span class="token class-name">Student</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin">uint256</span> id<span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">uint256</span> score<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">Student <span class="token keyword">public</span> student<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="delete操作符" tabindex="-1"><a class="header-anchor" href="#delete操作符"><span><code v-pre>delete</code>操作符</span></a></h3>
<p><code v-pre>delete a</code>会让变量<code v-pre>a</code>的值变为初始值。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// delete操作符</span></span>
<span class="line"><span class="token builtin">bool</span> <span class="token keyword">public</span> _bool2 <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">d</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">delete</span> _bool2<span class="token punctuation">;</span> <span class="token comment">// delete 会让_bool2变为默认值，false</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在remix上验证" tabindex="-1"><a class="header-anchor" href="#在remix上验证"><span>在remix上验证</span></a></h2>
<ul>
<li>
<p>部署合约查看值类型、引用类型的初始值</p>
<p><img src="@source/Solidity/img/8-1.png" alt="8-1.png"></p>
</li>
<li>
<p>值类型、引用类型<code v-pre>delete</code>操作后的默认值</p>
<p><img src="@source/Solidity/img/8-2.png" alt="8-2.png"></p>
</li>
</ul>
<h2 id="完整代码" tabindex="-1"><a class="header-anchor" href="#完整代码"><span>完整代码</span></a></h2>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// SPDX-License-Identifier: MIT</span></span>
<span class="line"><span class="token keyword">pragma</span> <span class="token keyword">solidity</span> <span class="token operator">^</span><span class="token version number">0.8.21</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">InitialValue</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// Value Types</span></span>
<span class="line">    <span class="token builtin">bool</span> <span class="token keyword">public</span> _bool<span class="token punctuation">;</span> <span class="token comment">// false</span></span>
<span class="line">    <span class="token builtin">string</span> <span class="token keyword">public</span> _string<span class="token punctuation">;</span> <span class="token comment">// ""</span></span>
<span class="line">    <span class="token builtin">int</span> <span class="token keyword">public</span> _int<span class="token punctuation">;</span> <span class="token comment">// 0</span></span>
<span class="line">    <span class="token builtin">uint</span> <span class="token keyword">public</span> _uint<span class="token punctuation">;</span> <span class="token comment">// 0</span></span>
<span class="line">    <span class="token builtin">address</span> <span class="token keyword">public</span> _address<span class="token punctuation">;</span> <span class="token comment">// 0x0000000000000000000000000000000000000000</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">enum</span> <span class="token class-name">ActionSet</span> <span class="token punctuation">{</span> Buy<span class="token punctuation">,</span> Hold<span class="token punctuation">,</span> Sell<span class="token punctuation">}</span></span>
<span class="line">    ActionSet <span class="token keyword">public</span> _enum<span class="token punctuation">;</span> <span class="token comment">// 第一个元素 0</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">fi</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">internal</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// internal空白方程</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">fe</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// external空白方程</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Reference Types</span></span>
<span class="line">    <span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span> <span class="token keyword">public</span> _staticArray<span class="token punctuation">;</span> <span class="token comment">// 所有成员设为其默认值的静态数组[0,0,0,0,0,0,0,0]</span></span>
<span class="line">    <span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">public</span> _dynamicArray<span class="token punctuation">;</span> <span class="token comment">// `[]`</span></span>
<span class="line">    <span class="token keyword">mapping</span><span class="token punctuation">(</span><span class="token builtin">uint</span> <span class="token operator">=></span> <span class="token builtin">address</span><span class="token punctuation">)</span> <span class="token keyword">public</span> _mapping<span class="token punctuation">;</span> <span class="token comment">// 所有元素都为其默认值的mapping</span></span>
<span class="line">    <span class="token comment">// 所有成员设为其默认值的结构体 0, 0</span></span>
<span class="line">    <span class="token keyword">struct</span> <span class="token class-name">Student</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token builtin">uint256</span> id<span class="token punctuation">;</span></span>
<span class="line">        <span class="token builtin">uint256</span> score<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    Student <span class="token keyword">public</span> student<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// delete操作符</span></span>
<span class="line">    <span class="token builtin">bool</span> <span class="token keyword">public</span> _bool2 <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">d</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">delete</span> _bool2<span class="token punctuation">;</span> <span class="token comment">// delete 会让_bool2变为默认值，false</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


