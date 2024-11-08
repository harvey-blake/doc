<template><div><Layout/><h1 id="_5-变量数据存储和作用域" tabindex="-1"><a class="header-anchor" href="#_5-变量数据存储和作用域"><span>5. 变量数据存储和作用域</span></a></h1>
<h2 id="solidity中的引用类型" tabindex="-1"><a class="header-anchor" href="#solidity中的引用类型"><span>Solidity中的引用类型</span></a></h2>
<p><strong>引用类型(Reference Type)</strong>：包括数组（<code v-pre>array</code>）和结构体（<code v-pre>struct</code>），由于这类变量比较复杂，占用存储空间大，我们在使用时必须要声明数据存储的位置。</p>
<h2 id="数据位置" tabindex="-1"><a class="header-anchor" href="#数据位置"><span>数据位置</span></a></h2>
<p>Solidity数据存储位置有三类：<code v-pre>storage</code>，<code v-pre>memory</code>和<code v-pre>calldata</code>。不同存储位置的<code v-pre>gas</code>成本不同。<code v-pre>storage</code>类型的数据存在链上，类似计算机的硬盘，消耗<code v-pre>gas</code>多；<code v-pre>memory</code>和<code v-pre>calldata</code>类型的临时存在内存里，消耗<code v-pre>gas</code>少。整体消耗<code v-pre>gas</code>从多到少依次为：<code v-pre>storage</code> &gt; <code v-pre>memory</code> &gt; <code v-pre>calldata</code>。大致用法：</p>
<ol>
<li>
<p><code v-pre>storage</code>：合约里的状态变量默认都是<code v-pre>storage</code>，存储在链上。</p>
</li>
<li>
<p><code v-pre>memory</code>：函数里的参数和临时变量一般用<code v-pre>memory</code>，存储在内存中，不上链。尤其是如果返回数据类型是变长的情况下，必须加memory修饰，例如：string, bytes, array和自定义结构。</p>
</li>
<li>
<p><code v-pre>calldata</code>：和<code v-pre>memory</code>类似，存储在内存中，不上链。与<code v-pre>memory</code>的不同点在于<code v-pre>calldata</code>变量不能修改（<code v-pre>immutable</code>），一般用于函数的参数。例子：</p>
</li>
</ol>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">fCalldata</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">calldata</span> _x<span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">calldata</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">//参数为calldata数组，不能被修改</span></span>
<span class="line">    <span class="token comment">// _x[0] = 0 //这样修改会报错</span></span>
<span class="line">    <span class="token keyword">return</span><span class="token punctuation">(</span>_x<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example:</strong></p>
<p><img src="@source/Solidity/img/5-1.png" alt="5-1.png"></p>
<h3 id="数据位置和赋值规则" tabindex="-1"><a class="header-anchor" href="#数据位置和赋值规则"><span>数据位置和赋值规则</span></a></h3>
<p>在不同存储类型相互赋值时候，有时会产生独立的副本（修改新变量不会影响原变量），有时会产生引用（修改新变量会影响原变量）。规则如下：</p>
<ul>
<li>
<p>赋值本质上是创建<strong>引用</strong>指向本体，因此修改本体或者是引用，变化可以被同步：</p>
<ul>
<li>
<p><code v-pre>storage</code>（合约的状态变量）赋值给本地<code v-pre>storage</code>（函数里的）时候，会创建引用，改变新变量会影响原变量。例子：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span> x <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 状态变量：数组 x</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">fStorage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">//声明一个storage的变量 xStorage，指向x。修改xStorage也会影响x</span></span>
<span class="line">    <span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">storage</span> xStorage <span class="token operator">=</span> x<span class="token punctuation">;</span></span>
<span class="line">    xStorage<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example:</strong></p>
<p><img src="@source/Solidity/img/5-2.png" alt="5-2.png"></p>
</li>
<li>
<p><code v-pre>memory</code>赋值给<code v-pre>memory</code>，会创建引用，改变新变量会影响原变量。</p>
</li>
</ul>
</li>
<li>
<p>其他情况下，赋值创建的是本体的副本，即对二者之一的修改，并不会同步到另一方。这有时会涉及到开发中的问题，比如从<code v-pre>storage</code>中读取数据，赋值给<code v-pre>memory</code>，然后修改<code v-pre>memory</code>的数据，但如果没有将<code v-pre>memory</code>的数据赋值回<code v-pre>storage</code>，那么<code v-pre>storage</code>的数据是不会改变的。</p>
</li>
</ul>
<h2 id="变量的作用域" tabindex="-1"><a class="header-anchor" href="#变量的作用域"><span>变量的作用域</span></a></h2>
<p><code v-pre>Solidity</code>中变量按作用域划分有三种，分别是状态变量（state variable），局部变量（local variable）和全局变量(global variable)</p>
<h3 id="_1-状态变量" tabindex="-1"><a class="header-anchor" href="#_1-状态变量"><span>1. 状态变量</span></a></h3>
<p>状态变量是数据存储在链上的变量，所有合约内函数都可以访问，<code v-pre>gas</code>消耗高。状态变量在合约内、函数外声明：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">contract</span> <span class="token class-name">Variables</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin">uint</span> <span class="token keyword">public</span> x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">uint</span> <span class="token keyword">public</span> y<span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">string</span> <span class="token keyword">public</span> z<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以在函数里更改状态变量的值：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 可以在函数里更改状态变量的值</span></span>
<span class="line">    x <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span></span>
<span class="line">    y <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span></span>
<span class="line">    z <span class="token operator">=</span> <span class="token string">"0xAA"</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-局部变量" tabindex="-1"><a class="header-anchor" href="#_2-局部变量"><span>2. 局部变量</span></a></h3>
<p>局部变量是仅在函数执行过程中有效的变量，函数退出后，变量无效。局部变量的数据存储在内存里，不上链，<code v-pre>gas</code>低。局部变量在函数内声明：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin">uint</span> xx <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">uint</span> yy <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">uint</span> zz <span class="token operator">=</span> xx <span class="token operator">+</span> yy<span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span><span class="token punctuation">(</span>zz<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-全局变量" tabindex="-1"><a class="header-anchor" href="#_3-全局变量"><span>3. 全局变量</span></a></h3>
<p>全局变量是全局范围工作的变量，都是<code v-pre>solidity</code>预留关键字。他们可以在函数内不声明直接使用：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">global</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">view</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">address</span><span class="token punctuation">,</span> <span class="token builtin">uint</span><span class="token punctuation">,</span> <span class="token builtin">bytes</span> <span class="token keyword">memory</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin">address</span> sender <span class="token operator">=</span> msg<span class="token punctuation">.</span>sender<span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">uint</span> blockNum <span class="token operator">=</span> block<span class="token punctuation">.</span>number<span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">bytes</span> <span class="token keyword">memory</span> data <span class="token operator">=</span> msg<span class="token punctuation">.</span>data<span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span><span class="token punctuation">(</span>sender<span class="token punctuation">,</span> blockNum<span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面例子里，我们使用了3个常用的全局变量：<code v-pre>msg.sender</code>，<code v-pre>block.number</code>和<code v-pre>msg.data</code>，他们分别代表请求发起地址，当前区块高度，和请求数据。下面是一些常用的全局变量，更完整的列表请看这个<a href="https://learnblockchain.cn/docs/solidity/units-and-global-variables.html#special-variables-and-functions" target="_blank" rel="noopener noreferrer">链接</a>：</p>
<ul>
<li><code v-pre>blockhash(uint blockNumber)</code>: (<code v-pre>bytes32</code>) 给定区块的哈希值 – 只适用于最近的256个区块, 不包含当前区块。</li>
<li><code v-pre>block.coinbase</code>: (<code v-pre>address payable</code>) 当前区块矿工的地址</li>
<li><code v-pre>block.gaslimit</code>: (<code v-pre>uint</code>) 当前区块的gaslimit</li>
<li><code v-pre>block.number</code>: (<code v-pre>uint</code>) 当前区块的number</li>
<li><code v-pre>block.timestamp</code>: (<code v-pre>uint</code>) 当前区块的时间戳，为unix纪元以来的秒</li>
<li><code v-pre>gasleft()</code>: (<code v-pre>uint256</code>) 剩余 gas</li>
<li><code v-pre>msg.data</code>: (<code v-pre>bytes calldata</code>) 完整call data</li>
<li><code v-pre>msg.sender</code>: (<code v-pre>address payable</code>) 消息发送者 (当前 caller)</li>
<li><code v-pre>msg.sig</code>: (<code v-pre>bytes4</code>) calldata的前四个字节 (function identifier)</li>
<li><code v-pre>msg.value</code>: (<code v-pre>uint</code>) 当前交易发送的 <code v-pre>wei</code> 值</li>
<li><code v-pre>block.blobbasefee</code>: (<code v-pre>uint</code>) 当前区块的blob基础费用。这是Cancun升级新增的全局变量。</li>
<li><code v-pre>blobhash(uint index)</code>: (<code v-pre>bytes32</code>) 返回跟当前交易关联的第 <code v-pre>index</code> 个blob的版本化哈希（第一个字节为版本号，当前为<code v-pre>0x01</code>，后面接KZG承诺的SHA256哈希的最后31个字节）。若当前交易不包含blob，则返回空字节。这是Cancun升级新增的全局变量。</li>
</ul>
<p><strong>Example:</strong></p>
<p><img src="@source/Solidity/img/5-4.png" alt="5-4.png"></p>
<h3 id="_4-全局变量-以太单位与时间单位" tabindex="-1"><a class="header-anchor" href="#_4-全局变量-以太单位与时间单位"><span>4. 全局变量-以太单位与时间单位</span></a></h3>
<h4 id="以太单位" tabindex="-1"><a class="header-anchor" href="#以太单位"><span>以太单位</span></a></h4>
<p><code v-pre>Solidity</code>中不存在小数点，以<code v-pre>0</code>代替为小数点，来确保交易的精确度，并且防止精度的损失，利用以太单位可以避免误算的问题，方便程序员在合约中处理货币交易。</p>
<ul>
<li><code v-pre>wei</code>: 1</li>
<li><code v-pre>gwei</code>: 1e9 = 1000000000</li>
<li><code v-pre>ether</code>: 1e18 = 1000000000000000000</li>
</ul>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">weiUnit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> wei <span class="token operator">==</span> <span class="token number">1e0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> wei <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token number">1</span> wei<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">gweiUnit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> gwei <span class="token operator">==</span> <span class="token number">1e9</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> gwei <span class="token operator">==</span> <span class="token number">1000000000</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token number">1</span> gwei<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">etherUnit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> ether <span class="token operator">==</span> <span class="token number">1e18</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> ether <span class="token operator">==</span> <span class="token number">1000000000000000000</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token number">1</span> ether<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example:</strong></p>
<p><img src="@source/Solidity/img/5-5.png" alt="5-5.png"></p>
<h4 id="时间单位" tabindex="-1"><a class="header-anchor" href="#时间单位"><span>时间单位</span></a></h4>
<p>可以在合约中规定一个操作必须在一周内完成，或者某个事件在一个月后发生。这样就能让合约的执行可以更加精确，不会因为技术上的误差而影响合约的结果。因此，时间单位在<code v-pre>Solidity</code>中是一个重要的概念，有助于提高合约的可读性和可维护性。</p>
<ul>
<li><code v-pre>seconds</code>: 1</li>
<li><code v-pre>minutes</code>: 60 seconds = 60</li>
<li><code v-pre>hours</code>: 60 minutes = 3600</li>
<li><code v-pre>days</code>: 24 hours = 86400</li>
<li><code v-pre>weeks</code>: 7 days = 604800</li>
</ul>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">secondsUnit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> seconds <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token number">1</span> seconds<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">minutesUnit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> minutes <span class="token operator">==</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> minutes <span class="token operator">==</span> <span class="token number">60</span> seconds<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token number">1</span> minutes<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">hoursUnit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> hours <span class="token operator">==</span> <span class="token number">3600</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> hours <span class="token operator">==</span> <span class="token number">60</span> minutes<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token number">1</span> hours<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">daysUnit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> days <span class="token operator">==</span> <span class="token number">86400</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> days <span class="token operator">==</span> <span class="token number">24</span> hours<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token number">1</span> days<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">weeksUnit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> weeks <span class="token operator">==</span> <span class="token number">604800</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> weeks <span class="token operator">==</span> <span class="token number">7</span> days<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token number">1</span> weeks<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example:</strong></p>
<p><img src="@source/Solidity/img/5-6.png" alt="5-6.png"></p>
<h2 id="完整合约" tabindex="-1"><a class="header-anchor" href="#完整合约"><span>完整合约</span></a></h2>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// SPDX-License-Identifier: MIT</span></span>
<span class="line"><span class="token keyword">pragma</span> <span class="token keyword">solidity</span> <span class="token operator">^</span><span class="token version number">0.8.21</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">DataStorage</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// The data location of x is storage.</span></span>
<span class="line">    <span class="token comment">// This is the only place where the</span></span>
<span class="line">    <span class="token comment">// data location can be omitted.</span></span>
<span class="line">    <span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">public</span> x <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">fStorage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">//声明一个storage的变量xStorage，指向x。修改xStorage也会影响x</span></span>
<span class="line">        <span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">storage</span> xStorage <span class="token operator">=</span> x<span class="token punctuation">;</span></span>
<span class="line">        xStorage<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">fMemory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">view</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">//声明一个Memory的变量xMemory，复制x。修改xMemory不会影响x</span></span>
<span class="line">        <span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">memory</span> xMemory <span class="token operator">=</span> x<span class="token punctuation">;</span></span>
<span class="line">        xMemory<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span></span>
<span class="line">        xMemory<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">memory</span> xMemory2 <span class="token operator">=</span> x<span class="token punctuation">;</span></span>
<span class="line">        xMemory2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">300</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">fCalldata</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">calldata</span> _x<span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">calldata</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">//参数为calldata数组，不能被修改</span></span>
<span class="line">        <span class="token comment">// _x[0] = 0 //这样修改会报错</span></span>
<span class="line">        <span class="token keyword">return</span><span class="token punctuation">(</span>_x<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">Variables</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin">uint</span> <span class="token keyword">public</span> x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">uint</span> <span class="token keyword">public</span> y<span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">string</span> <span class="token keyword">public</span> z<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 可以在函数里更改状态变量的值</span></span>
<span class="line">        x <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span></span>
<span class="line">        y <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span></span>
<span class="line">        z <span class="token operator">=</span> <span class="token string">"0xAA"</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token builtin">uint</span> xx <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token builtin">uint</span> yy <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token builtin">uint</span> zz <span class="token operator">=</span> xx <span class="token operator">+</span> yy<span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">return</span><span class="token punctuation">(</span>zz<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">global</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">view</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">address</span><span class="token punctuation">,</span> <span class="token builtin">uint</span><span class="token punctuation">,</span> <span class="token builtin">bytes</span> <span class="token keyword">memory</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token builtin">address</span> sender <span class="token operator">=</span> msg<span class="token punctuation">.</span>sender<span class="token punctuation">;</span></span>
<span class="line">        <span class="token builtin">uint</span> blockNum <span class="token operator">=</span> block<span class="token punctuation">.</span>number<span class="token punctuation">;</span></span>
<span class="line">        <span class="token builtin">bytes</span> <span class="token keyword">memory</span> data <span class="token operator">=</span> msg<span class="token punctuation">.</span>data<span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">return</span><span class="token punctuation">(</span>sender<span class="token punctuation">,</span> blockNum<span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">weiUnit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> wei <span class="token operator">==</span> <span class="token number">1e0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> wei <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token number">1</span> wei<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">gweiUnit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> gwei <span class="token operator">==</span> <span class="token number">1e9</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> gwei <span class="token operator">==</span> <span class="token number">1000000000</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token number">1</span> gwei<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">etherUnit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> ether <span class="token operator">==</span> <span class="token number">1e18</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> ether <span class="token operator">==</span> <span class="token number">1000000000000000000</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token number">1</span> ether<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">secondsUnit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> seconds <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token number">1</span> seconds<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">minutesUnit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> minutes <span class="token operator">==</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> minutes <span class="token operator">==</span> <span class="token number">60</span> seconds<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token number">1</span> minutes<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">hoursUnit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> hours <span class="token operator">==</span> <span class="token number">3600</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> hours <span class="token operator">==</span> <span class="token number">60</span> minutes<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token number">1</span> hours<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">daysUnit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> days <span class="token operator">==</span> <span class="token number">86400</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> days <span class="token operator">==</span> <span class="token number">24</span> hours<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token number">1</span> days<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">weeksUnit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">pure</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> weeks <span class="token operator">==</span> <span class="token number">604800</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token number">1</span> weeks <span class="token operator">==</span> <span class="token number">7</span> days<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token number">1</span> weeks<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


