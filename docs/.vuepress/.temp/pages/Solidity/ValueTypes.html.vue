<template><div><h1 id="_2-值类型" tabindex="-1"><a class="header-anchor" href="#_2-值类型"><span>2. 值类型</span></a></h1>
<h2 id="solidity中的变量类型" tabindex="-1"><a class="header-anchor" href="#solidity中的变量类型"><span>Solidity中的变量类型</span></a></h2>
<ol>
<li>
<p><strong>值类型(Value Type)</strong>：包括布尔型，整数型等等，这类变量赋值时候直接传递数值。</p>
</li>
<li>
<p><strong>引用类型(Reference Type)</strong>：包括数组和结构体，这类变量占空间大，赋值时候直接传递地址（类似指针）。</p>
</li>
<li>
<p><strong>映射类型(Mapping Type)</strong>: Solidity中存储键值对的数据结构，可以理解为哈希表</p>
</li>
</ol>
<p>我们将仅介绍常用类型，不常用的类型不会涉及，本篇将介绍值类型。</p>
<h2 id="值类型" tabindex="-1"><a class="header-anchor" href="#值类型"><span>值类型</span></a></h2>
<h3 id="_1-布尔型" tabindex="-1"><a class="header-anchor" href="#_1-布尔型"><span>1. 布尔型</span></a></h3>
<p>布尔型是二值变量，取值为 <code v-pre>true</code> 或 <code v-pre>false</code>。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// 布尔值</span></span>
<span class="line"><span class="token builtin">bool</span> <span class="token keyword">public</span> _bool <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>布尔值的运算符包括：</p>
<ul>
<li><code v-pre>!</code> （逻辑非）</li>
<li><code v-pre>&amp;&amp;</code> （逻辑与，&quot;and&quot;）</li>
<li><code v-pre>||</code> （逻辑或，&quot;or&quot;）</li>
<li><code v-pre>==</code> （等于）</li>
<li><code v-pre>!=</code> （不等于）</li>
</ul>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// 布尔运算</span></span>
<span class="line"><span class="token builtin">bool</span> <span class="token keyword">public</span> _bool1 <span class="token operator">=</span> <span class="token operator">!</span>_bool<span class="token punctuation">;</span> <span class="token comment">// 取非</span></span>
<span class="line"><span class="token builtin">bool</span> <span class="token keyword">public</span> _bool2 <span class="token operator">=</span> _bool <span class="token operator">&amp;&amp;</span> _bool1<span class="token punctuation">;</span> <span class="token comment">// 与</span></span>
<span class="line"><span class="token builtin">bool</span> <span class="token keyword">public</span> _bool3 <span class="token operator">=</span> _bool <span class="token operator">||</span> _bool1<span class="token punctuation">;</span> <span class="token comment">// 或</span></span>
<span class="line"><span class="token builtin">bool</span> <span class="token keyword">public</span> _bool4 <span class="token operator">=</span> _bool <span class="token operator">==</span> _bool1<span class="token punctuation">;</span> <span class="token comment">// 相等</span></span>
<span class="line"><span class="token builtin">bool</span> <span class="token keyword">public</span> _bool5 <span class="token operator">=</span> _bool <span class="token operator">!=</span> _bool1<span class="token punctuation">;</span> <span class="token comment">// 不相等</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中：变量 <code v-pre>_bool</code> 的取值是 <code v-pre>true</code>；<code v-pre>_bool1</code> 是 <code v-pre>_bool</code> 的非，为 <code v-pre>false</code>；<code v-pre>_bool &amp;&amp; _bool1</code> 为 <code v-pre>false</code>；<code v-pre>_bool || _bool1</code> 为 <code v-pre>true</code>；<code v-pre>_bool == _bool1</code> 为 <code v-pre>false</code>；<code v-pre>_bool != _bool1</code> 为 <code v-pre>true</code>。</p>
<p><strong>值得注意的是：</strong><code v-pre>&amp;&amp;</code> 和 <code v-pre>||</code> 运算符遵循短路规则，这意味着，假如存在 <code v-pre>f(x) || g(y)</code> 的表达式，如果 <code v-pre>f(x)</code> 是 <code v-pre>true</code>，<code v-pre>g(y)</code> 不会被计算，即使它和 <code v-pre>f(x)</code> 的结果是相反的。假如存在<code v-pre>f(x) &amp;&amp; g(y)</code> 的表达式，如果 <code v-pre>f(x)</code> 是 <code v-pre>false</code>，<code v-pre>g(y)</code> 不会被计算。
所谓“短路规则”，一般出现在逻辑与（&amp;&amp;）和逻辑或（||）中。 当逻辑与（&amp;&amp;）的第一个条件为false时，就不会再去判断第二个条件； 当逻辑或（||）的第一个条件为true时，就不会再去判断第二个条件，这就是短路规则。</p>
<h3 id="_2-整型" tabindex="-1"><a class="header-anchor" href="#_2-整型"><span>2. 整型</span></a></h3>
<p>整型是 Solidity 中的整数，最常用的包括：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// 整型</span></span>
<span class="line"><span class="token builtin">int</span> <span class="token keyword">public</span> _int <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 整数，包括负数</span></span>
<span class="line"><span class="token builtin">uint</span> <span class="token keyword">public</span> _uint <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 无符号整数</span></span>
<span class="line"><span class="token builtin">uint256</span> <span class="token keyword">public</span> _number <span class="token operator">=</span> <span class="token number">20220330</span><span class="token punctuation">;</span> <span class="token comment">// 256位无符号整数</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>常用的整型运算符包括：</p>
<ul>
<li>比较运算符（返回布尔值）： <code v-pre>&lt;=</code>， <code v-pre>&lt;</code>，<code v-pre>==</code>， <code v-pre>!=</code>， <code v-pre>&gt;=</code>， <code v-pre>&gt;</code></li>
<li>算术运算符： <code v-pre>+</code>， <code v-pre>-</code>， <code v-pre>*</code>， <code v-pre>/</code>， <code v-pre>%</code>（取余），<code v-pre>**</code>（幂）</li>
</ul>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// 整数运算</span></span>
<span class="line"><span class="token builtin">uint256</span> <span class="token keyword">public</span> _number1 <span class="token operator">=</span> _number <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// +，-，*，/</span></span>
<span class="line"><span class="token builtin">uint256</span> <span class="token keyword">public</span> _number2 <span class="token operator">=</span> <span class="token number">2</span><span class="token operator">**</span><span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// 指数</span></span>
<span class="line"><span class="token builtin">uint256</span> <span class="token keyword">public</span> _number3 <span class="token operator">=</span> <span class="token number">7</span> <span class="token operator">%</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// 取余数</span></span>
<span class="line"><span class="token builtin">bool</span> <span class="token keyword">public</span> _numberbool <span class="token operator">=</span> _number2 <span class="token operator">></span> _number3<span class="token punctuation">;</span> <span class="token comment">// 比大小</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>大家可以运行一下代码，看看这 4 个变量分别是多少。</p>
<h3 id="_3-地址类型" tabindex="-1"><a class="header-anchor" href="#_3-地址类型"><span>3. 地址类型</span></a></h3>
<p>地址类型(address)有两类：</p>
<ul>
<li>普通地址（address）: 存储一个 20 字节的值（以太坊地址的大小）。</li>
<li>payable address: 比普通地址多了 <code v-pre>transfer</code> 和 <code v-pre>send</code> 两个成员方法，用于接收转账。</li>
</ul>
<p>我们会在之后的章节更加详细地介绍 payable address。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// 地址</span></span>
<span class="line"><span class="token builtin">address</span> <span class="token keyword">public</span> _address <span class="token operator">=</span> <span class="token number">0x7A58c0Be72BE218B41C608b7Fe7C5bB630736C71</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token builtin">address</span> <span class="token keyword">payable</span> <span class="token keyword">public</span> _address1 <span class="token operator">=</span> <span class="token keyword">payable</span><span class="token punctuation">(</span>_address<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// payable address，可以转账、查余额</span></span>
<span class="line"><span class="token comment">// 地址类型的成员</span></span>
<span class="line"><span class="token builtin">uint256</span> <span class="token keyword">public</span> balance <span class="token operator">=</span> _address1<span class="token punctuation">.</span>balance<span class="token punctuation">;</span> <span class="token comment">// balance of address</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-定长字节数组" tabindex="-1"><a class="header-anchor" href="#_4-定长字节数组"><span>4. 定长字节数组</span></a></h3>
<p>字节数组分为定长和不定长两种：</p>
<ul>
<li>定长字节数组: 属于值类型，数组长度在声明之后不能改变。根据字节数组的长度分为 <code v-pre>bytes1</code>, <code v-pre>bytes8</code>, <code v-pre>bytes32</code> 等类型。定长字节数组最多存储 32 bytes 数据，即<code v-pre>bytes32</code>。</li>
<li>不定长字节数组: 属于引用类型（之后的章节介绍），数组长度在声明之后可以改变，包括 <code v-pre>bytes</code> 等。</li>
</ul>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// 固定长度的字节数组</span></span>
<span class="line"><span class="token builtin">bytes32</span> <span class="token keyword">public</span> _byte32 <span class="token operator">=</span> <span class="token string">"MiniSolidity"</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token builtin">bytes1</span> <span class="token keyword">public</span> _byte <span class="token operator">=</span> _byte32<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，字符串 <code v-pre>MiniSolidity</code> 以字节的方式存储进变量 <code v-pre>_byte32</code>。如果把它转换成 <code v-pre>16 进制</code>，就是：<code v-pre>0x4d696e69536f6c69646974790000000000000000000000000000000000000000</code></p>
<p><code v-pre>_byte</code> 变量的值为 <code v-pre>_byte32</code> 的第一个字节，即 <code v-pre>0x4d</code>。</p>
<h3 id="_5-枚举-enum" tabindex="-1"><a class="header-anchor" href="#_5-枚举-enum"><span>5. 枚举 enum</span></a></h3>
<p>枚举（<code v-pre>enum</code>）是 Solidity 中用户定义的数据类型。它主要用于为 <code v-pre>uint</code> 分配名称，使程序易于阅读和维护。它与 <code v-pre>C 语言</code> 中的 <code v-pre>enum</code> 类似，使用名称来代替从 <code v-pre>0</code> 开始的 <code v-pre>uint</code>：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// 用enum将uint 0， 1， 2表示为Buy, Hold, Sell</span></span>
<span class="line"><span class="token keyword">enum</span> <span class="token class-name">ActionSet</span> <span class="token punctuation">{</span> Buy<span class="token punctuation">,</span> Hold<span class="token punctuation">,</span> Sell <span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">// 创建enum变量 action</span></span>
<span class="line">ActionSet action <span class="token operator">=</span> ActionSet<span class="token punctuation">.</span>Buy<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>枚举可以显式地和 <code v-pre>uint</code> 相互转换，并会检查转换的无符号整数是否在枚举的长度内，否则会报错：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// enum可以和uint显式的转换</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">enumToUint</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">view</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token builtin">uint</span><span class="token punctuation">(</span>action<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>enum</code> 是一个比较冷门的数据类型，几乎没什么人用。</p>
<h2 id="在-remix-上运行" tabindex="-1"><a class="header-anchor" href="#在-remix-上运行"><span>在 Remix 上运行</span></a></h2>
<ul>
<li>部署合约后可以查看每个类型的变量的数值：</li>
</ul>
<p><img src="@source/Solidity/img/2-1.png" alt="2-1.png"></p>
<ul>
<li><code v-pre>enum</code> 和 <code v-pre>uint</code> 转换的示例：</li>
</ul>
<p><img src="@source/Solidity/img/2-2.png" alt="2-2.png">
<img src="@source/Solidity/img/2-3.png" alt="2-3.png"></p>
<h2 id="完整合约" tabindex="-1"><a class="header-anchor" href="#完整合约"><span>完整合约</span></a></h2>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// SPDX-License-Identifier: MIT</span></span>
<span class="line"><span class="token keyword">pragma</span> <span class="token keyword">solidity</span> <span class="token operator">^</span><span class="token version number">0.8.21</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">ValueTypes</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 布尔值</span></span>
<span class="line">    <span class="token builtin">bool</span> <span class="token keyword">public</span> _bool <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token comment">// 布尔运算</span></span>
<span class="line">    <span class="token builtin">bool</span> <span class="token keyword">public</span> _bool1 <span class="token operator">=</span> <span class="token operator">!</span>_bool<span class="token punctuation">;</span> <span class="token comment">//取非</span></span>
<span class="line">    <span class="token builtin">bool</span> <span class="token keyword">public</span> _bool2 <span class="token operator">=</span> _bool <span class="token operator">&amp;&amp;</span> _bool1<span class="token punctuation">;</span> <span class="token comment">//与</span></span>
<span class="line">    <span class="token builtin">bool</span> <span class="token keyword">public</span> _bool3 <span class="token operator">=</span> _bool <span class="token operator">||</span> _bool1<span class="token punctuation">;</span> <span class="token comment">//或</span></span>
<span class="line">    <span class="token builtin">bool</span> <span class="token keyword">public</span> _bool4 <span class="token operator">=</span> _bool <span class="token operator">==</span> _bool1<span class="token punctuation">;</span> <span class="token comment">//相等</span></span>
<span class="line">    <span class="token builtin">bool</span> <span class="token keyword">public</span> _bool5 <span class="token operator">=</span> _bool <span class="token operator">!=</span> _bool1<span class="token punctuation">;</span> <span class="token comment">//不相等</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 整数</span></span>
<span class="line">    <span class="token builtin">int</span> <span class="token keyword">public</span> _int <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">uint</span> <span class="token keyword">public</span> _uint <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">uint256</span> <span class="token keyword">public</span> _number <span class="token operator">=</span> <span class="token number">20220330</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token comment">// 整数运算</span></span>
<span class="line">    <span class="token builtin">uint256</span> <span class="token keyword">public</span> _number1 <span class="token operator">=</span> _number <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// +，-，*，/</span></span>
<span class="line">    <span class="token builtin">uint256</span> <span class="token keyword">public</span> _number2 <span class="token operator">=</span> <span class="token number">2</span><span class="token operator">**</span><span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// 指数</span></span>
<span class="line">    <span class="token builtin">uint256</span> <span class="token keyword">public</span> _number3 <span class="token operator">=</span> <span class="token number">7</span> <span class="token operator">%</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// 取余数</span></span>
<span class="line">    <span class="token builtin">bool</span> <span class="token keyword">public</span> _numberbool <span class="token operator">=</span> _number2 <span class="token operator">></span> _number3<span class="token punctuation">;</span> <span class="token comment">// 比大小</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 地址</span></span>
<span class="line">    <span class="token builtin">address</span> <span class="token keyword">public</span> _address <span class="token operator">=</span> <span class="token number">0x7A58c0Be72BE218B41C608b7Fe7C5bB630736C71</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">address</span> <span class="token keyword">payable</span> <span class="token keyword">public</span> _address1 <span class="token operator">=</span> <span class="token keyword">payable</span><span class="token punctuation">(</span>_address<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// payable address，可以转账、查余额</span></span>
<span class="line">    <span class="token comment">// 地址类型的成员</span></span>
<span class="line">    <span class="token builtin">uint256</span> <span class="token keyword">public</span> balance <span class="token operator">=</span> _address1<span class="token punctuation">.</span>balance<span class="token punctuation">;</span> <span class="token comment">// balance of address</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 固定长度的字节数组</span></span>
<span class="line">    <span class="token builtin">bytes32</span> <span class="token keyword">public</span> _byte32 <span class="token operator">=</span> <span class="token string">"MiniSolidity"</span><span class="token punctuation">;</span> <span class="token comment">// bytes32: 0x4d696e69536f6c69646974790000000000000000000000000000000000000000</span></span>
<span class="line">    <span class="token builtin">bytes1</span> <span class="token keyword">public</span> _byte <span class="token operator">=</span> _byte32<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// bytes1: 0x4d</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Enum</span></span>
<span class="line">    <span class="token comment">// 将uint 0， 1， 2表示为Buy, Hold, Sell</span></span>
<span class="line">    <span class="token keyword">enum</span> <span class="token class-name">ActionSet</span> <span class="token punctuation">{</span> Buy<span class="token punctuation">,</span> Hold<span class="token punctuation">,</span> Sell <span class="token punctuation">}</span></span>
<span class="line">    <span class="token comment">// 创建enum变量 action</span></span>
<span class="line">    ActionSet action <span class="token operator">=</span> ActionSet<span class="token punctuation">.</span>Buy<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// enum可以和uint显式的转换</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">enumToUint</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">view</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token builtin">uint</span><span class="token punctuation">(</span>action<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


