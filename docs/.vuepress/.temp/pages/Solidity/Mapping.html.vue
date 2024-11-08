<template><div><Layout/><h1 id="_7-映射类型-mapping" tabindex="-1"><a class="header-anchor" href="#_7-映射类型-mapping"><span>7. 映射类型 mapping</span></a></h1>
<h2 id="映射mapping" tabindex="-1"><a class="header-anchor" href="#映射mapping"><span>映射Mapping</span></a></h2>
<p>在映射中，人们可以通过键（<code v-pre>Key</code>）来查询对应的值（<code v-pre>Value</code>），比如：通过一个人的<code v-pre>id</code>来查询他的钱包地址。</p>
<p>声明映射的格式为<code v-pre>mapping(_KeyType =&gt; _ValueType)</code>，其中<code v-pre>_KeyType</code>和<code v-pre>_ValueType</code>分别是<code v-pre>Key</code>和<code v-pre>Value</code>的变量类型。例子：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">mapping</span><span class="token punctuation">(</span><span class="token builtin">uint</span> <span class="token operator">=></span> <span class="token builtin">address</span><span class="token punctuation">)</span> <span class="token keyword">public</span> idToAddress<span class="token punctuation">;</span> <span class="token comment">// id映射到地址</span></span>
<span class="line"><span class="token keyword">mapping</span><span class="token punctuation">(</span><span class="token builtin">address</span> <span class="token operator">=></span> <span class="token builtin">address</span><span class="token punctuation">)</span> <span class="token keyword">public</span> swapPair<span class="token punctuation">;</span> <span class="token comment">// 币对的映射，地址到地址</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="映射的规则" tabindex="-1"><a class="header-anchor" href="#映射的规则"><span>映射的规则</span></a></h2>
<ul>
<li>
<p><strong>规则1</strong>：映射的<code v-pre>_KeyType</code>只能选择Solidity内置的值类型，比如<code v-pre>uint</code>，<code v-pre>address</code>等，不能用自定义的结构体。而<code v-pre>_ValueType</code>可以使用自定义的类型。下面这个例子会报错，因为<code v-pre>_KeyType</code>使用了我们自定义的结构体：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// 我们定义一个结构体 Struct</span></span>
<span class="line"><span class="token keyword">struct</span> <span class="token class-name">Student</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin">uint256</span> id<span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">uint256</span> score<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">mapping</span><span class="token punctuation">(</span>Student <span class="token operator">=></span> <span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token keyword">public</span> testVar<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>规则2</strong>：映射的存储位置必须是<code v-pre>storage</code>，因此可以用于合约的状态变量，函数中的<code v-pre>storage</code>变量和library函数的参数（见<a href="https://github.com/ethereum/solidity/issues/4635" target="_blank" rel="noopener noreferrer">例子</a>）。不能用于<code v-pre>public</code>函数的参数或返回结果中，因为<code v-pre>mapping</code>记录的是一种关系 (key - value pair)。</p>
</li>
<li>
<p><strong>规则3</strong>：如果映射声明为<code v-pre>public</code>，那么Solidity会自动给你创建一个<code v-pre>getter</code>函数，可以通过<code v-pre>Key</code>来查询对应的<code v-pre>Value</code>。</p>
</li>
<li>
<p><strong>规则4</strong>：给映射新增的键值对的语法为<code v-pre>_Var[_Key] = _Value</code>，其中<code v-pre>_Var</code>是映射变量名，<code v-pre>_Key</code>和<code v-pre>_Value</code>对应新增的键值对。例子：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">function</span> writeMap <span class="token punctuation">(</span><span class="token builtin">uint</span> _Key<span class="token punctuation">,</span> <span class="token builtin">address</span> _Value<span class="token punctuation">)</span> <span class="token keyword">public</span><span class="token punctuation">{</span></span>
<span class="line">    idToAddress<span class="token punctuation">[</span>_Key<span class="token punctuation">]</span> <span class="token operator">=</span> _Value<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="映射的原理" tabindex="-1"><a class="header-anchor" href="#映射的原理"><span>映射的原理</span></a></h2>
<ul>
<li>
<p><strong>原理1</strong>: 映射不储存任何键（<code v-pre>Key</code>）的资讯，也没有length的资讯。</p>
</li>
<li>
<p><strong>原理2</strong>: 对于映射使用<code v-pre>keccak256(h(key) . slot)</code>计算存取value的位置。</p>
</li>
<li>
<p><strong>原理3</strong>: 因为Ethereum会定义所有未使用的空间为0，所以未赋值（<code v-pre>Value</code>）的键（<code v-pre>Key</code>）初始值都是各个type的默认值，如uint的默认值是0。</p>
</li>
</ul>
<h2 id="在remix上验证-以-mapping-sol为例" tabindex="-1"><a class="header-anchor" href="#在remix上验证-以-mapping-sol为例"><span>在Remix上验证 (以 <code v-pre>Mapping.sol</code>为例)</span></a></h2>
<ul>
<li>
<p>映射示例 1 部署</p>
<p><img src="@source/Solidity/img/7-1.jpg" alt="7-1"></p>
</li>
<li>
<p>映射示例 2 初始值</p>
<p><img src="@source/Solidity/img/7-2.jpg" alt="7-2"></p>
</li>
<li>
<p>映射示例 3 key-value pair</p>
<p><img src="@source/Solidity/img/7-3.jpg" alt="7-3"></p>
</li>
</ul>
<h2 id="完整合于" tabindex="-1"><a class="header-anchor" href="#完整合于"><span>完整合于</span></a></h2>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// SPDX-License-Identifier: MIT</span></span>
<span class="line"><span class="token keyword">pragma</span> <span class="token keyword">solidity</span> <span class="token operator">^</span><span class="token version number">0.8.21</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">Mapping</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">mapping</span><span class="token punctuation">(</span><span class="token builtin">uint</span> <span class="token operator">=></span> <span class="token builtin">address</span><span class="token punctuation">)</span> <span class="token keyword">public</span> idToAddress<span class="token punctuation">;</span> <span class="token comment">// id映射到地址</span></span>
<span class="line">    <span class="token keyword">mapping</span><span class="token punctuation">(</span><span class="token builtin">address</span> <span class="token operator">=></span> <span class="token builtin">address</span><span class="token punctuation">)</span> <span class="token keyword">public</span> swapPair<span class="token punctuation">;</span> <span class="token comment">// 币对的映射，地址到地址</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 规则1. _KeyType不能是自定义的 下面这个例子会报错</span></span>
<span class="line">    <span class="token comment">// 我们定义一个结构体 Struct</span></span>
<span class="line">    <span class="token comment">// struct Student{</span></span>
<span class="line">    <span class="token comment">//    uint256 id;</span></span>
<span class="line">    <span class="token comment">//    uint256 score;</span></span>
<span class="line">    <span class="token comment">//}</span></span>
<span class="line">    <span class="token comment">// mapping(Struct => uint) public testVar;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> writeMap <span class="token punctuation">(</span><span class="token builtin">uint</span> _Key<span class="token punctuation">,</span> <span class="token builtin">address</span> _Value<span class="token punctuation">)</span> <span class="token keyword">public</span><span class="token punctuation">{</span></span>
<span class="line">        idToAddress<span class="token punctuation">[</span>_Key<span class="token punctuation">]</span> <span class="token operator">=</span> _Value<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


