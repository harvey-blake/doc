<template><div><h1 id="_3-函数" tabindex="-1"><a class="header-anchor" href="#_3-函数"><span>3. 函数</span></a></h1>
<h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数"><span>函数</span></a></h2>
<p>Solidity语言的函数非常灵活，可以进行各种复杂操作。在本教程中，我们将会概述函数的基础概念，并通过一些示例演示如何使用函数。</p>
<p>我们先看一下 Solidity 中函数的形式:</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token operator">&lt;</span><span class="token keyword">function</span> name<span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">[</span>parameter types<span class="token punctuation">[</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token keyword">internal</span><span class="token operator">|</span><span class="token keyword">external</span><span class="token operator">|</span><span class="token keyword">public</span><span class="token operator">|</span><span class="token keyword">private</span><span class="token punctuation">}</span> <span class="token punctuation">[</span><span class="token keyword">pure</span><span class="token operator">|</span><span class="token keyword">view</span><span class="token operator">|</span><span class="token keyword">payable</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>virtual<span class="token operator">|</span>override<span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token operator">&lt;</span>modifiers<span class="token operator">></span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">[</span><span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token operator">&lt;</span><span class="token keyword">return</span> types<span class="token operator">></span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">{</span> <span class="token operator">&lt;</span><span class="token keyword">function</span> body<span class="token operator">></span> <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>看着有一些复杂，让我们从前往后逐个解释(方括号中的是可写可不
写的关键字)：</p>
<ol>
<li>
<p><code v-pre>function</code>：声明函数时的固定用法。要编写函数，就需要以 <code v-pre>function</code> 关键字开头。</p>
</li>
<li>
<p><code v-pre>&lt;function name&gt;</code>：函数名。</p>
</li>
<li>
<p><code v-pre>([parameter types[, ...]])</code>：圆括号内写入函数的参数，即输入到函数的变量类型和名称。</p>
</li>
<li>
<p><code v-pre>{internal|external|public|private}</code>：函数可见性说明符，共有4种。</p>
<ul>
<li><code v-pre>public</code>：内部和外部均可见。</li>
<li><code v-pre>private</code>：只能从本合约内部访问，继承的合约也不能使用。</li>
<li><code v-pre>external</code>：只能从合约外部访问（但内部可以通过 <code v-pre>this.f()</code> 来调用，<code v-pre>f</code>是函数名）。</li>
<li><code v-pre>internal</code>: 只能从合约内部访问，继承的合约可以用。</li>
</ul>
<p><strong>注意 1</strong>：合约中定义的函数需要明确指定可见性，它们没有默认值。</p>
<p><strong>注意 2</strong>：<code v-pre>public|private|internal</code> 也可用于修饰状态变量(定义可参考<a href="%5B../05_DataStorage/readme.md%5D">WTF Solidity 第5讲的相关内容</a>)。<code v-pre>public</code>变量会自动生成同名的<code v-pre>getter</code>函数，用于查询数值。未标明可见性类型的状态变量，默认为<code v-pre>internal</code>。</p>
</li>
<li>
<p><code v-pre>[pure|view|payable]</code>：决定函数权限/功能的关键字。<code v-pre>payable</code>（可支付的）很好理解，带着它的函数，运行的时候可以给合约转入 ETH。<code v-pre>pure</code> 和 <code v-pre>view</code> 的介绍见下一节。</p>
</li>
<li>
<p><code v-pre>[virtual|override]</code>: 方法是否可以被重写，或者是否是重写方法。<code v-pre>virtual</code>用在父合约上，标识的方法可以被子合约重写。<code v-pre>override</code>用在自合约上，表名方法重写了父合约的方法。</p>
</li>
<li>
<p><code v-pre>&lt;modifiers&gt;</code>: 自定义的修饰器，可以有0个或多个修饰器。</p>
</li>
<li>
<p><code v-pre>[returns ()]</code>：函数返回的变量类型和名称。</p>
</li>
<li>
<p><code v-pre>&lt;function body&gt;</code>: 函数体。</p>
</li>
</ol>
<h2 id="到底什么是-pure-和view" tabindex="-1"><a class="header-anchor" href="#到底什么是-pure-和view"><span>到底什么是 <code v-pre>Pure</code> 和<code v-pre>View</code>？</span></a></h2>
<p>刚开始学习 <code v-pre>solidity</code> 时，<code v-pre>pure</code> 和 <code v-pre>view</code> 关键字可能令人费解，因为其他编程语言中没有类似的关键字。<code v-pre>solidity</code> 引入这两个关键字主要是因为 以太坊交易需要支付气费（gas fee）。合约的状态变量存储在链上，gas fee 很贵，如果计算不改变链上状态，就可以不用付 <code v-pre>gas</code>。包含 <code v-pre>pure</code> 和 <code v-pre>view</code> 关键字的函数是不改写链上状态的，因此用户直接调用它们是不需要付 gas 的（注意，合约中非 <code v-pre>pure</code>/<code v-pre>view</code> 函数调用 <code v-pre>pure</code>/<code v-pre>view</code> 函数时需要付gas）。</p>
<p>在以太坊中，以下语句被视为修改链上状态：</p>
<ol>
<li>写入状态变量。</li>
<li>释放事件。</li>
<li>创建其他合约。</li>
<li>使用 <code v-pre>selfdestruct</code>.</li>
<li>通过调用发送以太币。</li>
<li>调用任何未标记 <code v-pre>view</code> 或 <code v-pre>pure</code> 的函数。</li>
<li>使用低级调用（low-level calls）。</li>
<li>使用包含某些操作码的内联汇编。</li>
</ol>
<p>为了帮助大家理解，我画了一个马里奥插图。在这幅插图中，我将合约中的状态变量（存储在链上）比作碧琪公主，三种不同的角色代表不同的关键字。</p>
<p><img src="https://images.mirror-media.xyz/publication-images/1B9kHsTYnDY_QURSWMmPb.png?height=1028&amp;width=1758" alt="WTF is pure and view in solidity?"></p>
<ul>
<li>
<p><code v-pre>pure</code>，中文意思是“纯”，这里可以理解为”纯打酱油的”。<code v-pre>pure</code> 函数既不能读取也不能写入链上的状态变量。就像小怪一样，看不到也摸不到碧琪公主。</p>
</li>
<li>
<p><code v-pre>view</code>，“看”，这里可以理解为“看客”。<code v-pre>view</code>函数能读取但也不能写入状态变量。类似马里奥，能看到碧琪公主，但终究是看客，不能入洞房。</p>
</li>
<li>
<p>非 <code v-pre>pure</code> 或 <code v-pre>view</code> 的函数既可以读取也可以写入状态变量。类似马里奥里的 <code v-pre>boss</code>，可以对碧琪公主为所欲为🐶。</p>
</li>
</ul>
<h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码"><span>代码</span></a></h2>
<h3 id="_1-pure-和-view" tabindex="-1"><a class="header-anchor" href="#_1-pure-和-view"><span>1. pure 和 view</span></a></h3>
<p>我们在合约里定义一个状态变量 <code v-pre>number</code>，初始化为 5。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// SPDX-License-Identifier: MIT</span></span>
<span class="line"><span class="token keyword">pragma</span> <span class="token keyword">solidity</span> <span class="token operator">^</span><span class="token version number">0.8.21</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">FunctionTypes</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin">uint256</span> <span class="token keyword">public</span> number <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义一个 <code v-pre>add()</code> 函数，每次调用会让 <code v-pre>number</code> 增加 1。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// 默认function</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span><span class="token punctuation">{</span></span>
<span class="line">    number <span class="token operator">=</span> number <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果 <code v-pre>add()</code> 函数被标记为 <code v-pre>pure</code>，比如 <code v-pre>function add() external pure</code>，就会报错。因为 <code v-pre>pure</code> 是不配读取合约里的状态变量的，更不配改写。那 <code v-pre>pure</code> 函数能做些什么？举个例子，你可以给函数传递一个参数 <code v-pre>_number</code>，然后让他返回 <code v-pre>_number + 1</code>，这个操作不会读取或写入状态变量。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// pure: 纯纯牛马</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">addPure</span><span class="token punctuation">(</span><span class="token builtin">uint256</span> _number<span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint256</span> new_number<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    new_number <span class="token operator">=</span> _number <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/Solidity/img/3-3.png" alt="3-3.png"></p>
<p>如果 <code v-pre>add()</code> 函数被标记为 <code v-pre>view</code>，比如 <code v-pre>function add() external view</code>，也会报错。因为 <code v-pre>view</code> 能读取，但不能够改写状态变量。我们可以稍微改写下函数，读取但是不改写 <code v-pre>number</code>，返回一个新的变量。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// view: 看客</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">addView</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">view</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint256</span> new_number<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    new_number <span class="token operator">=</span> number <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/Solidity/img/3-4.png" alt="3-4.png"></p>
<h3 id="_2-internal-v-s-external" tabindex="-1"><a class="header-anchor" href="#_2-internal-v-s-external"><span>2. internal v.s. external</span></a></h3>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// internal: 内部函数</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">minus</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">internal</span> <span class="token punctuation">{</span></span>
<span class="line">    number <span class="token operator">=</span> number <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 合约内的函数可以调用内部函数</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">minusCall</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">minus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们定义一个 <code v-pre>internal</code> 的 <code v-pre>minus()</code> 函数，每次调用使得 <code v-pre>number</code> 变量减少 1。由于 <code v-pre>internal</code> 函数只能由合约内部调用，我们必须再定义一个 <code v-pre>external</code> 的 <code v-pre>minusCall()</code> 函数，通过它间接调用内部的 <code v-pre>minus()</code> 函数。</p>
<p><img src="@source/Solidity/img/3-1.png" alt="3-1.png"></p>
<h3 id="_3-payable" tabindex="-1"><a class="header-anchor" href="#_3-payable"><span>3. payable</span></a></h3>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// payable: 递钱，能给合约支付eth的函数</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">minusPayable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">payable</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint256</span> balance<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">minus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    balance <span class="token operator">=</span> <span class="token builtin">address</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">.</span>balance<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们定义一个 <code v-pre>external payable</code> 的 <code v-pre>minusPayable()</code> 函数，间接的调用 <code v-pre>minus()</code>，并且返回合约里的 ETH 余额（<code v-pre>this</code> 关键字可以让我们引用合约地址）。我们可以在调用 <code v-pre>minusPayable()</code> 时往合约里转入1个 ETH。</p>
<p><img src="https://images.mirror-media.xyz/publication-images/ETDPN8myq7jFfAL8CUAFt.png?height=148&amp;width=588" alt="mirror-image-1"></p>
<p>我们可以在返回的信息中看到，合约的余额变为 1 ETH。</p>
<p><img src="https://images.mirror-media.xyz/publication-images/nGZ2pz0MvzgXuKrENJPYf.png?height=128&amp;width=1130" alt="mirror-image-2"></p>
<p><img src="@source/Solidity/img/3-2.png" alt="3-2.png"></p>
<h2 id="完整合约" tabindex="-1"><a class="header-anchor" href="#完整合约"><span>完整合约</span></a></h2>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// SPDX-License-Identifier: MIT</span></span>
<span class="line"><span class="token keyword">pragma</span> <span class="token keyword">solidity</span> <span class="token operator">^</span><span class="token version number">0.8.21</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">FunctionTypes</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin">uint256</span> <span class="token keyword">public</span> number <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">payable</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 函数类型</span></span>
<span class="line">    <span class="token comment">// function (&lt;parameter types>) {internal|external} [pure|view|payable] [returns (&lt;return types>)]</span></span>
<span class="line">    <span class="token comment">// 默认function</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span><span class="token punctuation">{</span></span>
<span class="line">        number <span class="token operator">=</span> number <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// pure: 纯纯牛马</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">addPure</span><span class="token punctuation">(</span><span class="token builtin">uint256</span> _number<span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint256</span> new_number<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        new_number <span class="token operator">=</span> _number<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// view: 看客</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">addView</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">view</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint256</span> new_number<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        new_number <span class="token operator">=</span> number <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// internal: 内部函数</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">minus</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">internal</span> <span class="token punctuation">{</span></span>
<span class="line">        number <span class="token operator">=</span> number <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 合约内的函数可以调用内部函数</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">minusCall</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">minus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// payable: 递钱，能给合约支付eth的函数</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">minusPayable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">payable</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint256</span> balance<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">minus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        balance <span class="token operator">=</span> <span class="token builtin">address</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">.</span>balance<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


