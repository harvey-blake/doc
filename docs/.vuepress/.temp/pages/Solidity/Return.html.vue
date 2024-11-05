<template><div><h1 id="_4-函数输出" tabindex="-1"><a class="header-anchor" href="#_4-函数输出"><span>4. 函数输出</span></a></h1>
<h2 id="返回值-return-和-returns" tabindex="-1"><a class="header-anchor" href="#返回值-return-和-returns"><span>返回值：return 和 returns</span></a></h2>
<p>Solidity 中与函数输出相关的有两个关键字：<code v-pre>return</code>和<code v-pre>returns</code>。它们的区别在于：</p>
<ul>
<li><code v-pre>returns</code>：跟在函数名后面，用于声明返回的变量类型及变量名。</li>
<li><code v-pre>return</code>：用于函数主体中，返回指定的变量。</li>
</ul>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// 返回多个变量</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">returnMultiple</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint256</span><span class="token punctuation">,</span> <span class="token builtin">bool</span><span class="token punctuation">,</span> <span class="token builtin">uint256</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token keyword">memory</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token builtin">uint256</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们利用 <code v-pre>returns</code> 关键字声明了有多个返回值的 <code v-pre>returnMultiple()</code> 函数，然后我们在函数主体中使用 <code v-pre>return(1, true, [uint256(1),2,5])</code> 确定了返回值。</p>
<p>这里<code v-pre>uint256[3]</code>声明了一个长度为<code v-pre>3</code>且类型为<code v-pre>uint256</code>的数组作为返回值。因为<code v-pre>[1,2,3]</code>会默认为<code v-pre>uint8(3)</code>，因此<code v-pre>[uint256(1),2,5]</code>中首个元素必须强转<code v-pre>uint256</code>来声明该数组内的元素皆为此类型。数组类型返回值默认必须用memory修饰，在下一个章节会细说<RouteLink to="/Solidity/DataStorage.html">变量的存储和作用域</RouteLink>。</p>
<h2 id="命名式返回" tabindex="-1"><a class="header-anchor" href="#命名式返回"><span>命名式返回</span></a></h2>
<p>我们可以在 <code v-pre>returns</code> 中标明返回变量的名称。Solidity 会初始化这些变量，并且自动返回这些变量的值，无需使用 <code v-pre>return</code>。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// 命名式返回</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">returnNamed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint256</span> _number<span class="token punctuation">,</span> <span class="token builtin">bool</span> _bool<span class="token punctuation">,</span> <span class="token builtin">uint256</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token keyword">memory</span> _array<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    _number <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span></span>
<span class="line">    _bool <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span></span>
<span class="line">    _array <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token builtin">uint256</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们用 <code v-pre>returns(uint256 _number, bool _bool, uint256[3] memory _array)</code> 声明了返回变量类型以及变量名。这样，在主体中只需为变量 <code v-pre>_number</code>、<code v-pre>_bool</code>和<code v-pre>_array</code> 赋值，即可自动返回。</p>
<p>当然，你也可以在命名式返回中用 <code v-pre>return</code> 来返回变量：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// 命名式返回，依然支持return</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">returnNamed2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint256</span> _number<span class="token punctuation">,</span> <span class="token builtin">bool</span> _bool<span class="token punctuation">,</span> <span class="token builtin">uint256</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token keyword">memory</span> _array<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token builtin">uint256</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="解构式赋值" tabindex="-1"><a class="header-anchor" href="#解构式赋值"><span>解构式赋值</span></a></h2>
<p>Solidity 支持使用解构式赋值规则来读取函数的全部或部分返回值。</p>
<ul>
<li>
<p>读取所有返回值：声明变量，然后将要赋值的变量用<code v-pre>,</code>隔开，按顺序排列。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token builtin">uint256</span> _number<span class="token punctuation">;</span></span>
<span class="line"><span class="token builtin">bool</span> _bool<span class="token punctuation">;</span></span>
<span class="line"><span class="token builtin">uint256</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token keyword">memory</span> _array<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">(</span>_number<span class="token punctuation">,</span> _bool<span class="token punctuation">,</span> _array<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token function">returnNamed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>读取部分返回值：声明要读取的返回值对应的变量，不读取的留空。在下面的代码中，我们只读取<code v-pre>_bool</code>，而不读取返回的<code v-pre>_number</code>和<code v-pre>_array</code>：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token punctuation">(</span><span class="token punctuation">,</span> _bool2<span class="token punctuation">,</span> <span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token function">returnNamed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
<h2 id="在-remix-上运行" tabindex="-1"><a class="header-anchor" href="#在-remix-上运行"><span>在 Remix 上运行</span></a></h2>
<ul>
<li>
<p>部署合约后查看三种返回方式的结果</p>
<p><img src="@source/Solidity/img/4-1.png" alt="4-1.png"></p>
</li>
</ul>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<p>这一讲，我们介绍 Solidity 函数返回值，包括：返回多种变量，命名式返回，以及利用解构式赋值读取全部或部分返回值。这些知识点有助于我们在编写智能合约时，更灵活地处理函数返回值。</p>
</div></template>


