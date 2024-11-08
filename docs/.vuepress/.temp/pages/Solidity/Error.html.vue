<template><div><Layout/><h1 id="_15-异常" tabindex="-1"><a class="header-anchor" href="#_15-异常"><span>15. 异常</span></a></h1>
<p>我们介绍<code v-pre>Solidity</code>三种抛出异常的方法：<code v-pre>error</code>，<code v-pre>require</code>和<code v-pre>assert</code>，并比较三种方法的<code v-pre>gas</code>消耗。</p>
<h2 id="异常" tabindex="-1"><a class="header-anchor" href="#异常"><span>异常</span></a></h2>
<p>写智能合约经常会出<code v-pre>bug</code>，<code v-pre>Solidity</code>中的异常命令帮助我们<code v-pre>debug</code>。</p>
<h3 id="error" tabindex="-1"><a class="header-anchor" href="#error"><span>Error</span></a></h3>
<p><code v-pre>error</code>是<code v-pre>solidity 0.8.4版本</code>新加的内容，方便且高效（省<code v-pre>gas</code>）地向用户解释操作失败的原因，同时还可以在抛出异常的同时携带参数，帮助开发者更好地调试。人们可以在<code v-pre>contract</code>之外定义异常。下面，我们定义一个<code v-pre>TransferNotOwner</code>异常，当用户不是代币<code v-pre>owner</code>的时候尝试转账，会抛出错误：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line">error <span class="token function">TransferNotOwner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 自定义error</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>我们也可以定义一个携带参数的异常，来提示尝试转账的账户地址</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line">error <span class="token function">TransferNotOwner</span><span class="token punctuation">(</span><span class="token builtin">address</span> sender<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 自定义的带参数的error</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>在执行当中，<code v-pre>error</code>必须搭配<code v-pre>revert</code>（回退）命令使用。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">transferOwner1</span><span class="token punctuation">(</span><span class="token builtin">uint256</span> tokenId<span class="token punctuation">,</span> <span class="token builtin">address</span> newOwner<span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span><span class="token punctuation">(</span>_owners<span class="token punctuation">[</span>tokenId<span class="token punctuation">]</span> <span class="token operator">!=</span> msg<span class="token punctuation">.</span>sender<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">revert</span> <span class="token function">TransferNotOwner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token comment">// revert TransferNotOwner(msg.sender);</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    _owners<span class="token punctuation">[</span>tokenId<span class="token punctuation">]</span> <span class="token operator">=</span> newOwner<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们定义了一个<code v-pre>transferOwner1()</code>函数，它会检查代币的<code v-pre>owner</code>是不是发起人，如果不是，就会抛出<code v-pre>TransferNotOwner</code>异常；如果是的话，就会转账。</p>
<h3 id="require" tabindex="-1"><a class="header-anchor" href="#require"><span>Require</span></a></h3>
<p><code v-pre>require</code>命令是<code v-pre>solidity 0.8版本</code>之前抛出异常的常用方法，目前很多主流合约仍然还在使用它。它很好用，唯一的缺点就是<code v-pre>gas</code>随着描述异常的字符串长度增加，比<code v-pre>error</code>命令要高。使用方法：<code v-pre>require(检查条件，&quot;异常的描述&quot;)</code>，当检查条件不成立的时候，就会抛出异常。</p>
<p>我们用<code v-pre>require</code>命令重写一下上面的<code v-pre>transferOwner1</code>函数：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">transferOwner2</span><span class="token punctuation">(</span><span class="token builtin">uint256</span> tokenId<span class="token punctuation">,</span> <span class="token builtin">address</span> newOwner<span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">require</span><span class="token punctuation">(</span>_owners<span class="token punctuation">[</span>tokenId<span class="token punctuation">]</span> <span class="token operator">==</span> msg<span class="token punctuation">.</span>sender<span class="token punctuation">,</span> <span class="token string">"Transfer Not Owner"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    _owners<span class="token punctuation">[</span>tokenId<span class="token punctuation">]</span> <span class="token operator">=</span> newOwner<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="assert" tabindex="-1"><a class="header-anchor" href="#assert"><span>Assert</span></a></h3>
<p><code v-pre>assert</code>命令一般用于程序员写程序<code v-pre>debug</code>，因为它不能解释抛出异常的原因（比<code v-pre>require</code>少个字符串）。它的用法很简单，<code v-pre>assert(检查条件）</code>，当检查条件不成立的时候，就会抛出异常。</p>
<p>我们用<code v-pre>assert</code>命令重写一下上面的<code v-pre>transferOwner1</code>函数：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">transferOwner3</span><span class="token punctuation">(</span><span class="token builtin">uint256</span> tokenId<span class="token punctuation">,</span> <span class="token builtin">address</span> newOwner<span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">assert</span><span class="token punctuation">(</span>_owners<span class="token punctuation">[</span>tokenId<span class="token punctuation">]</span> <span class="token operator">==</span> msg<span class="token punctuation">.</span>sender<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    _owners<span class="token punctuation">[</span>tokenId<span class="token punctuation">]</span> <span class="token operator">=</span> newOwner<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在remix上验证" tabindex="-1"><a class="header-anchor" href="#在remix上验证"><span>在remix上验证</span></a></h2>
<ol>
<li>
<p>输入任意<code v-pre>uint256</code>数字和非0地址，调用<code v-pre>transferOwner1</code>，也就是<code v-pre>error</code>方法，控制台抛出了异常并显示我们自定义的<code v-pre>TransferNotOwner</code>。</p>
<p><img src="@source/Solidity/img/15-1.png" alt="15-1.png"></p>
</li>
<li>
<p>输入任意<code v-pre>uint256</code>数字和非0地址，调用<code v-pre>transferOwner2</code>，也就是<code v-pre>require</code>方法，控制台抛出了异常并打印出<code v-pre>require</code>中的字符串。</p>
<p><img src="@source/Solidity/img/15-2.png" alt="15-2.png"></p>
</li>
<li>
<p>输入任意<code v-pre>uint256</code>数字和非0地址，调用<code v-pre>transferOwner3</code>，也就是<code v-pre>assert</code>方法，控制台只抛出了异常。</p>
<p><img src="@source/Solidity/img/15-3.png" alt="15-3.png"></p>
</li>
</ol>
<h2 id="三种方法的gas比较" tabindex="-1"><a class="header-anchor" href="#三种方法的gas比较"><span>三种方法的gas比较</span></a></h2>
<p>我们比较一下三种抛出异常的<code v-pre>gas</code>消耗，通过remix控制台的Debug按钮，能查到每次函数调用的<code v-pre>gas</code>消耗分别如下：
（使用0.8.17版本编译）</p>
<ol>
<li><strong><code v-pre>error</code>方法<code v-pre>gas</code>消耗</strong>：24457  (<strong>加入参数后<code v-pre>gas</code>消耗</strong>：24660)</li>
<li><strong><code v-pre>require</code>方法<code v-pre>gas</code>消耗</strong>：24755</li>
<li><strong><code v-pre>assert</code>方法<code v-pre>gas</code>消耗</strong>：24473</li>
</ol>
<p>我们可以看到，<code v-pre>error</code>方法<code v-pre>gas</code>最少，其次是<code v-pre>assert</code>，<code v-pre>require</code>方法消耗<code v-pre>gas</code>最多！因此，<code v-pre>error</code>既可以告知用户抛出异常的原因，又能省<code v-pre>gas</code>，大家要多用！（注意，由于部署测试时间的不同，每个函数的<code v-pre>gas</code>消耗会有所不同，但是比较结果会是一致的。）</p>
<p><strong>备注:</strong> Solidity 0.8.0之前的版本，<code v-pre>assert</code>抛出的是一个 <code v-pre>panic exception</code>，会把剩余的 <code v-pre>gas</code> 全部消耗，不会返还。更多细节见<a href="https://docs.soliditylang.org/en/v0.8.17/control-structures.html" target="_blank" rel="noopener noreferrer">官方文档</a>。</p>
<h2 id="完整合约" tabindex="-1"><a class="header-anchor" href="#完整合约"><span>完整合约</span></a></h2>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token comment">// SPDX-License-Identifier: MIT</span></span>
<span class="line"><span class="token keyword">pragma</span> <span class="token keyword">solidity</span> <span class="token operator">^</span><span class="token version number">0.8.21</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Gas cost在Remix中测试得到 使用0.8.17版本编译</span></span>
<span class="line"><span class="token comment">// 参数使用 tokenId = 123, address = {any address}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 自定义error</span></span>
<span class="line">error <span class="token function">TransferNotOwner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// error TransferNotOwner(address sender);</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">contract</span> <span class="token class-name">Errors</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 一组映射，记录每个TokenId的Owner</span></span>
<span class="line">    <span class="token keyword">mapping</span><span class="token punctuation">(</span><span class="token builtin">uint256</span> <span class="token operator">=></span> <span class="token builtin">address</span><span class="token punctuation">)</span> <span class="token keyword">private</span> _owners<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Error方法: gas cost 24457</span></span>
<span class="line">    <span class="token comment">// Error with parameter: gas cost 24660</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">transferOwner1</span><span class="token punctuation">(</span><span class="token builtin">uint256</span> tokenId<span class="token punctuation">,</span> <span class="token builtin">address</span> newOwner<span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>_owners<span class="token punctuation">[</span>tokenId<span class="token punctuation">]</span> <span class="token operator">!=</span> msg<span class="token punctuation">.</span>sender<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">revert</span> <span class="token function">TransferNotOwner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token comment">// revert TransferNotOwner(msg.sender);</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        _owners<span class="token punctuation">[</span>tokenId<span class="token punctuation">]</span> <span class="token operator">=</span> newOwner<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// require方法: gas cost 24755</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">transferOwner2</span><span class="token punctuation">(</span><span class="token builtin">uint256</span> tokenId<span class="token punctuation">,</span> <span class="token builtin">address</span> newOwner<span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">require</span><span class="token punctuation">(</span>_owners<span class="token punctuation">[</span>tokenId<span class="token punctuation">]</span> <span class="token operator">==</span> msg<span class="token punctuation">.</span>sender<span class="token punctuation">,</span> <span class="token string">"Transfer Not Owner"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        _owners<span class="token punctuation">[</span>tokenId<span class="token punctuation">]</span> <span class="token operator">=</span> newOwner<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// assert方法: gas cost 24473</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">transferOwner3</span><span class="token punctuation">(</span><span class="token builtin">uint256</span> tokenId<span class="token punctuation">,</span> <span class="token builtin">address</span> newOwner<span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">assert</span><span class="token punctuation">(</span>_owners<span class="token punctuation">[</span>tokenId<span class="token punctuation">]</span> <span class="token operator">==</span> msg<span class="token punctuation">.</span>sender<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        _owners<span class="token punctuation">[</span>tokenId<span class="token punctuation">]</span> <span class="token operator">=</span> newOwner<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


