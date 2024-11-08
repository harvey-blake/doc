<template><div><Layout/><h1 id="_6-引用类型-array-struct" tabindex="-1"><a class="header-anchor" href="#_6-引用类型-array-struct"><span>6. 引用类型, array, struct</span></a></h1>
<h2 id="数组-array" tabindex="-1"><a class="header-anchor" href="#数组-array"><span>数组 array</span></a></h2>
<p>数组（<code v-pre>Array</code>）是<code v-pre>Solidity</code>常用的一种变量类型，用来存储一组数据（整数，字节，地址等等）。数组分为固定长度数组和可变长度数组两种：</p>
<ul>
<li>
<p>固定长度数组：在声明时指定数组的长度。用<code v-pre>T[k]</code>的格式声明，其中<code v-pre>T</code>是元素的类型，<code v-pre>k</code>是长度，例如：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// 固定长度 Array</span></span>
<span class="line"><span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span> array1<span class="token punctuation">;</span></span>
<span class="line"><span class="token builtin">bytes1</span><span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span> array2<span class="token punctuation">;</span></span>
<span class="line"><span class="token builtin">address</span><span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">]</span> array3<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>可变长度数组（动态数组）：在声明时不指定数组的长度。用<code v-pre>T[]</code>的格式声明，其中<code v-pre>T</code>是元素的类型，例如：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// 可变长度 Array</span></span>
<span class="line"><span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array4<span class="token punctuation">;</span></span>
<span class="line"><span class="token builtin">bytes1</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array5<span class="token punctuation">;</span></span>
<span class="line"><span class="token builtin">address</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array6<span class="token punctuation">;</span></span>
<span class="line"><span class="token builtin">bytes</span> array7<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意</strong>：<code v-pre>bytes</code>比较特殊，是数组，但是不用加<code v-pre>[]</code>。另外，不能用<code v-pre>byte[]</code>声明单字节数组，可以使用<code v-pre>bytes</code>或<code v-pre>bytes1[]</code>。<code v-pre>bytes</code> 比 <code v-pre>bytes1[]</code> 省gas。</p>
</li>
</ul>
<h3 id="创建数组的规则" tabindex="-1"><a class="header-anchor" href="#创建数组的规则"><span>创建数组的规则</span></a></h3>
<p>在Solidity里，创建数组有一些规则：</p>
<ul>
<li>
<p>对于<code v-pre>memory</code>修饰的<code v-pre>动态数组</code>，可以用<code v-pre>new</code>操作符来创建，但是必须声明长度，并且声明后长度不能改变。例子：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// memory动态数组</span></span>
<span class="line"><span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">memory</span> array8 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token builtin">bytes</span> <span class="token keyword">memory</span> array9 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">bytes</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>数组字面常数(Array Literals)是写作表达式形式的数组，用方括号包着来初始化array的一种方式，并且里面每一个元素的type是以第一个元素为准的，例如<code v-pre>[1,2,3]</code>里面所有的元素都是<code v-pre>uint8</code>类型，因为在Solidity中，如果一个值没有指定type的话，会根据上下文推断出元素的类型，默认就是最小单位的type，这里默认最小单位类型是<code v-pre>uint8</code>。而<code v-pre>[uint(1),2,3]</code>里面的元素都是<code v-pre>uint</code>类型，因为第一个元素指定了是<code v-pre>uint</code>类型了，里面每一个元素的type都以第一个元素为准。</p>
<p>下面的例子中，如果没有对传入 <code v-pre>g()</code> 函数的数组进行 <code v-pre>uint</code> 转换，是会报错的。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// SPDX-License-Identifier: GPL-3.0</span></span>
<span class="line"><span class="token keyword">pragma</span> <span class="token keyword">solidity</span> <span class="token operator">>=</span><span class="token version number">0.4.16</span> <span class="token operator">&lt;</span><span class="token version number">0.9.0</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">C</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">pure</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">g</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token builtin">uint</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">g</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token keyword">memory</span> _data<span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">pure</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// ...</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>如果创建的是动态数组，你需要一个一个元素的赋值。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">memory</span> x <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">x<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">x<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span></span>
<span class="line">x<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="数组成员" tabindex="-1"><a class="header-anchor" href="#数组成员"><span>数组成员</span></a></h3>
<ul>
<li><code v-pre>length</code>: 数组有一个包含元素数量的<code v-pre>length</code>成员，<code v-pre>memory</code>数组的长度在创建后是固定的。</li>
<li><code v-pre>push()</code>: <code v-pre>动态数组</code>拥有<code v-pre>push()</code>成员，可以在数组最后添加一个<code v-pre>0</code>元素，并返回该元素的引用。</li>
<li><code v-pre>push(x)</code>: <code v-pre>动态数组</code>拥有<code v-pre>push(x)</code>成员，可以在数组最后添加一个<code v-pre>x</code>元素。</li>
<li><code v-pre>pop()</code>: <code v-pre>动态数组</code>拥有<code v-pre>pop()</code>成员，可以移除数组最后一个元素。</li>
</ul>
<p><strong>Example:</strong></p>
<p><img src="@source/Solidity/img/6-1.png" alt="6-1.png"></p>
<h2 id="结构体-struct" tabindex="-1"><a class="header-anchor" href="#结构体-struct"><span>结构体 struct</span></a></h2>
<p><code v-pre>Solidity</code>支持通过构造结构体的形式定义新的类型。结构体中的元素可以是原始类型，也可以是引用类型；结构体可以作为数组或映射的元素。创建结构体的方法：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// 结构体</span></span>
<span class="line"><span class="token keyword">struct</span> <span class="token class-name">Student</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin">uint256</span> id<span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">uint256</span> score<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">Student student<span class="token punctuation">;</span> <span class="token comment">// 初始一个student结构体</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>给结构体赋值的四种方法：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">//  给结构体赋值</span></span>
<span class="line"><span class="token comment">// 方法1:在函数中创建一个storage的struct引用</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">initStudent1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span><span class="token punctuation">{</span></span>
<span class="line">    Student <span class="token keyword">storage</span> _student <span class="token operator">=</span> student<span class="token punctuation">;</span> <span class="token comment">// assign a copy of student</span></span>
<span class="line">    _student<span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token number">11</span><span class="token punctuation">;</span></span>
<span class="line">    _student<span class="token punctuation">.</span>score <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example:</strong></p>
<p><img src="@source/Solidity/img/6-2.png" alt="6-2.png"></p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// 方法2:直接引用状态变量的struct</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">initStudent2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span><span class="token punctuation">{</span></span>
<span class="line">    student<span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">    student<span class="token punctuation">.</span>score <span class="token operator">=</span> <span class="token number">80</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example:</strong></p>
<p><img src="@source/Solidity/img/6-3.png" alt="6-3.png"></p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// 方法3:构造函数式</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">initStudent3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token punctuation">{</span></span>
<span class="line">    student <span class="token operator">=</span> <span class="token function">Student</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example:</strong></p>
<p><img src="@source/Solidity/img/6-4.png" alt="6-4.png"></p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// 方法4:key value</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">initStudent4</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token punctuation">{</span></span>
<span class="line">    student <span class="token operator">=</span> <span class="token function">Student</span><span class="token punctuation">(</span><span class="token punctuation">{</span>id<span class="token punctuation">:</span> <span class="token number">4</span><span class="token punctuation">,</span> score<span class="token punctuation">:</span> <span class="token number">60</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example:</strong></p>
<p><img src="@source/Solidity/img/6-5.png" alt="6-5.png"></p>
<h2 id="完整合约" tabindex="-1"><a class="header-anchor" href="#完整合约"><span>完整合约</span></a></h2>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// SPDX-License-Identifier: MIT</span></span>
<span class="line"><span class="token keyword">pragma</span> <span class="token keyword">solidity</span> <span class="token operator">^</span><span class="token version number">0.8.21</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">ArrayTypes</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 固定长度 Array</span></span>
<span class="line">    <span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span> array1<span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">bytes1</span><span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span> array2<span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">address</span><span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">]</span> array3<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 可变长度 Array</span></span>
<span class="line">    <span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array4<span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">bytes1</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array5<span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">address</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array6<span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">bytes</span> array7<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 初始化可变长度 Array</span></span>
<span class="line">    <span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array8 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">bytes</span> array9 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">bytes</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token comment">//  给可变长度数组赋值</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">initArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">memory</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">memory</span> x <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        x<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">        x<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span></span>
<span class="line">        x<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">return</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">arrayPush</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">memory</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token keyword">memory</span> a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token builtin">uint</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">        array4 <span class="token operator">=</span> a<span class="token punctuation">;</span></span>
<span class="line">        array4<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">return</span> array4<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">pragma</span> <span class="token keyword">solidity</span> <span class="token operator">^</span><span class="token version number">0.8.21</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">StructTypes</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 结构体 Struct</span></span>
<span class="line">    <span class="token keyword">struct</span> <span class="token class-name">Student</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token builtin">uint256</span> id<span class="token punctuation">;</span></span>
<span class="line">        <span class="token builtin">uint256</span> score<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    Student student<span class="token punctuation">;</span> <span class="token comment">// 初始一个student结构体</span></span>
<span class="line">    <span class="token comment">//  给结构体赋值</span></span>
<span class="line">    <span class="token comment">// 方法1:在函数中创建一个storage的struct引用</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">initStudent1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span><span class="token punctuation">{</span></span>
<span class="line">        Student <span class="token keyword">storage</span> _student <span class="token operator">=</span> student<span class="token punctuation">;</span> <span class="token comment">// assign a copy of student</span></span>
<span class="line">        _student<span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token number">11</span><span class="token punctuation">;</span></span>
<span class="line">        _student<span class="token punctuation">.</span>score <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 方法2:直接引用状态变量的struct</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">initStudent2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span><span class="token punctuation">{</span></span>
<span class="line">        student<span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">        student<span class="token punctuation">.</span>score <span class="token operator">=</span> <span class="token number">80</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 方法3:构造函数式</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">initStudent3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token punctuation">{</span></span>
<span class="line">        student <span class="token operator">=</span> <span class="token function">Student</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 方法4:key value</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">initStudent4</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token punctuation">{</span></span>
<span class="line">        student <span class="token operator">=</span> <span class="token function">Student</span><span class="token punctuation">(</span><span class="token punctuation">{</span>id<span class="token punctuation">:</span> <span class="token number">4</span><span class="token punctuation">,</span> score<span class="token punctuation">:</span> <span class="token number">60</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">pragma</span> <span class="token keyword">solidity</span> <span class="token operator">^</span><span class="token version number">0.8.21</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">EnumTypes</span> <span class="token punctuation">{</span></span>
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
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


