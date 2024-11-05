<template><div><h1 id="_13-继承" tabindex="-1"><a class="header-anchor" href="#_13-继承"><span>13. 继承</span></a></h1>
<p>我最近在重新学 Solidity，巩固一下细节，也写一个“WTF Solidity极简入门”，供小白们使用（编程大佬可以另找教程），每周更新 1-3 讲。</p>
<p>推特：<a href="https://twitter.com/0xAA_Science" target="_blank" rel="noopener noreferrer">@0xAA_Science</a>｜<a href="https://twitter.com/WTFAcademy_" target="_blank" rel="noopener noreferrer">@WTFAcademy_</a></p>
<p>社区：<a href="https://discord.gg/5akcruXrsk" target="_blank" rel="noopener noreferrer">Discord</a>｜<a href="https://docs.google.com/forms/d/e/1FAIpQLSe4KGT8Sh6sJ7hedQRuIYirOoZK_85miz3dw7vA1-YjodgJ-A/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">微信群</a>｜<a href="https://wtf.academy" target="_blank" rel="noopener noreferrer">官网 wtf.academy</a></p>
<p>所有代码和教程开源在 github: <a href="https://github.com/AmazingAng/WTF-Solidity" target="_blank" rel="noopener noreferrer">github.com/AmazingAng/WTF-Solidity</a></p>
<hr>
<p>这一讲，我们介绍<code v-pre>Solidity</code>中的继承（<code v-pre>inheritance</code>），包括简单继承，多重继承，以及修饰器（<code v-pre>Modifier</code>）和构造函数（<code v-pre>Constructor</code>）的继承。</p>
<h2 id="继承" tabindex="-1"><a class="header-anchor" href="#继承"><span>继承</span></a></h2>
<p>继承是面向对象编程很重要的组成部分，可以显著减少重复代码。如果把合约看作是对象的话，<code v-pre>Solidity</code>也是面向对象的编程，也支持继承。</p>
<h3 id="规则" tabindex="-1"><a class="header-anchor" href="#规则"><span>规则</span></a></h3>
<ul>
<li>
<p><code v-pre>virtual</code>: 父合约中的函数，如果希望子合约重写，需要加上<code v-pre>virtual</code>关键字。</p>
</li>
<li>
<p><code v-pre>override</code>：子合约重写了父合约中的函数，需要加上<code v-pre>override</code>关键字。</p>
</li>
</ul>
<p><strong>注意</strong>：用<code v-pre>override</code>修饰<code v-pre>public</code>变量，会重写与变量同名的<code v-pre>getter</code>函数，例如：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">mapping</span><span class="token punctuation">(</span><span class="token builtin">address</span> <span class="token operator">=></span> <span class="token builtin">uint256</span><span class="token punctuation">)</span> <span class="token keyword">public</span> override balanceOf<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="简单继承" tabindex="-1"><a class="header-anchor" href="#简单继承"><span>简单继承</span></a></h3>
<p>我们先写一个简单的爷爷合约<code v-pre>Yeye</code>，里面包含1个<code v-pre>Log</code>事件和3个<code v-pre>function</code>: <code v-pre>hip()</code>, <code v-pre>pop()</code>, <code v-pre>yeye()</code>，输出都是”Yeye”。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">contract</span> <span class="token class-name">Yeye</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">event</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token builtin">string</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 定义3个function: hip(), pop(), yeye()，Log值为Yeye。</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">hip</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> virtual<span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">emit</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"Yeye"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> virtual<span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">emit</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"Yeye"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">yeye</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> virtual <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">emit</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"Yeye"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们再定义一个爸爸合约<code v-pre>Baba</code>，让他继承<code v-pre>Yeye</code>合约，语法就是<code v-pre>contract Baba is Yeye</code>，非常直观。在<code v-pre>Baba</code>合约里，我们重写一下<code v-pre>hip()</code>和<code v-pre>pop()</code>这两个函数，加上<code v-pre>override</code>关键字，并将他们的输出改为<code v-pre>”Baba”</code>；并且加一个新的函数<code v-pre>baba</code>，输出也是<code v-pre>”Baba”</code>。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">contract</span> <span class="token class-name">Baba</span> <span class="token keyword">is</span> Yeye<span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 继承两个function: hip()和pop()，输出改为Baba。</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">hip</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> virtual override<span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">emit</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"Baba"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> virtual override<span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">emit</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"Baba"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">baba</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> virtual<span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">emit</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"Baba"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们部署合约，可以看到<code v-pre>Baba</code>合约里有4个函数，其中<code v-pre>hip()</code>和<code v-pre>pop()</code>的输出被成功改写成<code v-pre>”Baba”</code>，而继承来的<code v-pre>yeye()</code>的输出仍然是<code v-pre>”Yeye”</code>。</p>
<h3 id="多重继承" tabindex="-1"><a class="header-anchor" href="#多重继承"><span>多重继承</span></a></h3>
<p><code v-pre>Solidity</code>的合约可以继承多个合约。规则：</p>
<ol>
<li>
<p>继承时要按辈分最高到最低的顺序排。比如我们写一个<code v-pre>Erzi</code>合约，继承<code v-pre>Yeye</code>合约和<code v-pre>Baba</code>合约，那么就要写成<code v-pre>contract Erzi is Yeye, Baba</code>，而不能写成<code v-pre>contract Erzi is Baba, Yeye</code>，不然就会报错。</p>
</li>
<li>
<p>如果某一个函数在多个继承的合约里都存在，比如例子中的<code v-pre>hip()</code>和<code v-pre>pop()</code>，在子合约里必须重写，不然会报错。</p>
</li>
<li>
<p>重写在多个父合约中都重名的函数时，<code v-pre>override</code>关键字后面要加上所有父合约名字，例如<code v-pre>override(Yeye, Baba)</code>。</p>
</li>
</ol>
<p>例子：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">contract</span> <span class="token class-name">Erzi</span> <span class="token keyword">is</span> Yeye<span class="token punctuation">,</span> Baba<span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 继承两个function: hip()和pop()，输出值为Erzi。</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">hip</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> virtual <span class="token function">override</span><span class="token punctuation">(</span>Yeye<span class="token punctuation">,</span> Baba<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">emit</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"Erzi"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> virtual <span class="token function">override</span><span class="token punctuation">(</span>Yeye<span class="token punctuation">,</span> Baba<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">emit</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"Erzi"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到，<code v-pre>Erzi</code>合约里面重写了<code v-pre>hip()</code>和<code v-pre>pop()</code>两个函数，将输出改为<code v-pre>”Erzi”</code>，并且还分别从<code v-pre>Yeye</code>和<code v-pre>Baba</code>合约继承了<code v-pre>yeye()</code>和<code v-pre>baba()</code>两个函数。</p>
<h3 id="修饰器的继承" tabindex="-1"><a class="header-anchor" href="#修饰器的继承"><span>修饰器的继承</span></a></h3>
<p><code v-pre>Solidity</code>中的修饰器（<code v-pre>Modifier</code>）同样可以继承，用法与函数继承类似，在相应的地方加<code v-pre>virtual</code>和<code v-pre>override</code>关键字即可。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">contract</span> <span class="token class-name">Base1</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">modifier</span> <span class="token function">exactDividedBy2And3</span><span class="token punctuation">(</span><span class="token builtin">uint</span> _a<span class="token punctuation">)</span> virtual <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">require</span><span class="token punctuation">(</span>_a <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> _a <span class="token operator">%</span> <span class="token number">3</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">_</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">Identifier</span> <span class="token keyword">is</span> Base1 <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">//计算一个数分别被2除和被3除的值，但是传入的参数必须是2和3的倍数</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">getExactDividedBy2And3</span><span class="token punctuation">(</span><span class="token builtin">uint</span> _dividend<span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token function">exactDividedBy2And3</span><span class="token punctuation">(</span>_dividend<span class="token punctuation">)</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">,</span> <span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token function">getExactDividedBy2And3WithoutModifier</span><span class="token punctuation">(</span>_dividend<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">//计算一个数分别被2除和被3除的值</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">getExactDividedBy2And3WithoutModifier</span><span class="token punctuation">(</span><span class="token builtin">uint</span> _dividend<span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">,</span> <span class="token builtin">uint</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token builtin">uint</span> div2 <span class="token operator">=</span> _dividend <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token builtin">uint</span> div3 <span class="token operator">=</span> _dividend <span class="token operator">/</span> <span class="token number">3</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token punctuation">(</span>div2<span class="token punctuation">,</span> div3<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Identifier</code>合约可以直接在代码中使用父合约中的<code v-pre>exactDividedBy2And3</code>修饰器，也可以利用<code v-pre>override</code>关键字重写修饰器：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">modifier</span> <span class="token function">exactDividedBy2And3</span><span class="token punctuation">(</span><span class="token builtin">uint</span> _a<span class="token punctuation">)</span> override <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">_</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">require</span><span class="token punctuation">(</span>_a <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> _a <span class="token operator">%</span> <span class="token number">3</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="构造函数的继承" tabindex="-1"><a class="header-anchor" href="#构造函数的继承"><span>构造函数的继承</span></a></h3>
<p>子合约有两种方法继承父合约的构造函数。举个简单的例子，父合约<code v-pre>A</code>里面有一个状态变量<code v-pre>a</code>，并由构造函数的参数来确定：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// 构造函数的继承</span></span>
<span class="line">abstract <span class="token keyword">contract</span> <span class="token class-name">A</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin">uint</span> <span class="token keyword">public</span> a<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">constructor</span><span class="token punctuation">(</span><span class="token builtin">uint</span> _a<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        a <span class="token operator">=</span> _a<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>
<p>在继承时声明父构造函数的参数，例如：<code v-pre>contract B is A(1)</code></p>
</li>
<li>
<p>在子合约的构造函数中声明构造函数的参数，例如：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">contract</span> <span class="token class-name">C</span> <span class="token keyword">is</span> A <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">constructor</span><span class="token punctuation">(</span><span class="token builtin">uint</span> _c<span class="token punctuation">)</span> <span class="token function">A</span><span class="token punctuation">(</span>_c <span class="token operator">*</span> _c<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="调用父合约的函数" tabindex="-1"><a class="header-anchor" href="#调用父合约的函数"><span>调用父合约的函数</span></a></h3>
<p>子合约有两种方式调用父合约的函数，直接调用和利用<code v-pre>super</code>关键字。</p>
<ol>
<li>
<p>直接调用：子合约可以直接用<code v-pre>父合约名.函数名()</code>的方式来调用父合约函数，例如<code v-pre>Yeye.pop()</code></p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">callParent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span><span class="token punctuation">{</span></span>
<span class="line">    Yeye<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>super</code>关键字：子合约可以利用<code v-pre>super.函数名()</code>来调用最近的父合约函数。<code v-pre>Solidity</code>继承关系按声明时从右到左的顺序是：<code v-pre>contract Erzi is Yeye, Baba</code>，那么<code v-pre>Baba</code>是最近的父合约，<code v-pre>super.pop()</code>将调用<code v-pre>Baba.pop()</code>而不是<code v-pre>Yeye.pop()</code>：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">callParentSuper</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 将调用最近的父合约函数，Baba.pop()</span></span>
<span class="line">    super<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="钻石继承" tabindex="-1"><a class="header-anchor" href="#钻石继承"><span>钻石继承</span></a></h3>
<p>在面向对象编程中，钻石继承（菱形继承）指一个派生类同时有两个或两个以上的基类。</p>
<p>在多重+菱形继承链条上使用<code v-pre>super</code>关键字时，需要注意的是使用<code v-pre>super</code>会调用继承链条上的每一个合约的相关函数，而不是只调用最近的父合约。</p>
<p>我们先写一个合约<code v-pre>God</code>，再写<code v-pre>Adam</code>和<code v-pre>Eve</code>两个合约继承<code v-pre>God</code>合约，最后让创建合约<code v-pre>people</code>继承自<code v-pre>Adam</code>和<code v-pre>Eve</code>，每个合约都有<code v-pre>foo</code>和<code v-pre>bar</code>两个函数。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// SPDX-License-Identifier: MIT</span></span>
<span class="line"><span class="token keyword">pragma</span> <span class="token keyword">solidity</span> <span class="token operator">^</span><span class="token version number">0.8.13</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">/* 继承树：</span>
<span class="line">  God</span>
<span class="line"> /  \</span>
<span class="line">Adam Eve</span>
<span class="line"> \  /</span>
<span class="line">people</span>
<span class="line">*/</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">God</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">event</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token builtin">string</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> virtual <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">emit</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"God.foo called"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> virtual <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">emit</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"God.bar called"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">Adam</span> <span class="token keyword">is</span> God <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> virtual override <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">emit</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"Adam.foo called"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        super<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> virtual override <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">emit</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"Adam.bar called"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        super<span class="token punctuation">.</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">Eve</span> <span class="token keyword">is</span> God <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> virtual override <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">emit</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"Eve.foo called"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        super<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> virtual override <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">emit</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"Eve.bar called"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        super<span class="token punctuation">.</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">people</span> <span class="token keyword">is</span> Adam<span class="token punctuation">,</span> Eve <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token function">override</span><span class="token punctuation">(</span>Adam<span class="token punctuation">,</span> Eve<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        super<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token function">override</span><span class="token punctuation">(</span>Adam<span class="token punctuation">,</span> Eve<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        super<span class="token punctuation">.</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，调用合约<code v-pre>people</code>中的<code v-pre>super.bar()</code>会依次调用<code v-pre>Eve</code>、<code v-pre>Adam</code>，最后是<code v-pre>God</code>合约。</p>
<p>虽然<code v-pre>Eve</code>、<code v-pre>Adam</code>都是<code v-pre>God</code>的子合约，但整个过程中<code v-pre>God</code>合约只会被调用一次。原因是<code v-pre>Solidity</code>借鉴了Python的方式，强制一个由基类构成的DAG（有向无环图）使其保证一个特定的顺序。更多细节你可以查阅<a href="https://solidity-cn.readthedocs.io/zh/develop/contracts.html?highlight=%E7%BB%A7%E6%89%BF#index-16" target="_blank" rel="noopener noreferrer">Solidity的官方文档</a>。</p>
<h2 id="在remix上验证" tabindex="-1"><a class="header-anchor" href="#在remix上验证"><span>在Remix上验证</span></a></h2>
<ul>
<li>
<p>合约简单继承示例, 可以观察到Baba合约多了Yeye的函数</p>
<p><img src="@source/Solidity/img/13-1.png" alt="13-1">
<img src="@source/Solidity/img/13-2.png" alt="13-2"></p>
</li>
<li>
<p>合约多重继承可以参考简单继承的操作步骤来增加部署Erzi合约，然后观察暴露的函数以及尝试调用来查看日志</p>
</li>
<li>
<p>修饰器继承示例</p>
<p><img src="@source/Solidity/img/13-3.png" alt="13-3">
<img src="@source/Solidity/img/13-4.png" alt="13-4">
<img src="@source/Solidity/img/13-5.png" alt="13-5"></p>
</li>
<li>
<p>构造函数继承示例</p>
<p><img src="@source/Solidity/img/13-6.png" alt="13-6">
<img src="@source/Solidity/img/13-7.png" alt="13-7"></p>
</li>
<li>
<p>调用父合约示例</p>
<p><img src="@source/Solidity/img/13-8.png" alt="13-8">
<img src="@source/Solidity/img/13-9.png" alt="13-9"></p>
</li>
<li>
<p>菱形继承示例</p>
<p><img src="@source/Solidity/img/13-10.png" alt="13-10"></p>
</li>
</ul>
<h2 id="合约代码" tabindex="-1"><a class="header-anchor" href="#合约代码"><span>合约代码</span></a></h2>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="Inheritance.sol"><pre v-pre><code><span class="line"><span class="token comment">// SPDX-License-Identifier: MIT</span></span>
<span class="line"><span class="token keyword">pragma</span> <span class="token keyword">solidity</span> <span class="token operator">^</span><span class="token version number">0.8.21</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 合约继承</span></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">Yeye</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">event</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token builtin">string</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 定义3个function: hip(), pop(), yeye()，Log值为Yeye。</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">hip</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> virtual<span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">emit</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"Yeye"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> virtual<span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">emit</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"Yeye"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">yeye</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> virtual <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">emit</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"Yeye"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">Baba</span> <span class="token keyword">is</span> Yeye<span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 继承两个function: hip()和pop()，输出改为Baba。</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">hip</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> virtual override<span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">emit</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"Baba"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> virtual override<span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">emit</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"Baba"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">baba</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> virtual<span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">emit</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"Baba"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">Erzi</span> <span class="token keyword">is</span> Yeye<span class="token punctuation">,</span> Baba<span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 继承两个function: hip()和pop()，输出改为Erzi。</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">hip</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> virtual <span class="token function">override</span><span class="token punctuation">(</span>Yeye<span class="token punctuation">,</span> Baba<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">emit</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"Erzi"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> virtual <span class="token function">override</span><span class="token punctuation">(</span>Yeye<span class="token punctuation">,</span> Baba<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">emit</span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"Erzi"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">callParent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span><span class="token punctuation">{</span></span>
<span class="line">        Yeye<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">callParentSuper</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span><span class="token punctuation">{</span></span>
<span class="line">        super<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 构造函数的继承</span></span>
<span class="line">abstract <span class="token keyword">contract</span> <span class="token class-name">A</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin">uint</span> <span class="token keyword">public</span> a<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">constructor</span><span class="token punctuation">(</span><span class="token builtin">uint</span> _a<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        a <span class="token operator">=</span> _a<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">B</span> <span class="token keyword">is</span> <span class="token function">A</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">C</span> <span class="token keyword">is</span> A <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">constructor</span><span class="token punctuation">(</span><span class="token builtin">uint</span> _c<span class="token punctuation">)</span> <span class="token function">A</span><span class="token punctuation">(</span>_c <span class="token operator">*</span> _c<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


