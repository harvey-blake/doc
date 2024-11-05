<template><div><h1 id="_13-编码calldata" tabindex="-1"><a class="header-anchor" href="#_13-编码calldata"><span>13. 编码calldata</span></a></h1>
<p>我们将介绍<code v-pre>ethers.js</code>中的接口类，并利用它编码<code v-pre>calldata</code>。</p>
<h2 id="接口类-interface" tabindex="-1"><a class="header-anchor" href="#接口类-interface"><span>接口类 Interface</span></a></h2>
<p><code v-pre>ethers.js</code>的接口类抽象了与以太坊网络上的合约交互所需的<code v-pre>ABI</code>编码和解码。<code v-pre>ABI</code>（Application Binary Interface）与<code v-pre>API</code>类似，是一格式，用于对合约可以处理的各种类型的数据进行编码，以便它们可以交互。</p>
<p>我们可以利用<code v-pre>abi</code>生成或者直接从合约中获取<code v-pre>interface</code>变量：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// 利用abi生成</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token keyword">interface</span> <span class="token operator">=</span> ethers<span class="token punctuation">.</span><span class="token function">Interface</span><span class="token punctuation">(</span>abi<span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 直接从contract中获取</span></span>
<span class="line"><span class="token keyword">const</span> interface2 <span class="token operator">=</span> contract<span class="token punctuation">.</span>interface</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接口类封装了一些编码解码的方法。与一些特殊的合约交互时（比如代理合约），你需要编码参数、解码返回值：</p>
<p><strong>注意</strong>：相关函数必须包含在<code v-pre>abi</code>中。</p>
<ul>
<li>
<p><code v-pre>getSighash()</code>：获取函数选择器（function selector），参数为函数名或函数签名。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">interface</span><span class="token punctuation">.</span><span class="token function">getSighash</span><span class="token punctuation">(</span><span class="token string">"balanceOf"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>encodeDeploy()</code>：编码构造器的参数，然后可以附在合约字节码的后面。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">interface</span><span class="token punctuation">.</span><span class="token function">encodeDeploy</span><span class="token punctuation">(</span><span class="token string">"Wrapped ETH"</span><span class="token punctuation">,</span> <span class="token string">"WETH"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>encodeFunctionData()</code>：编码函数的<code v-pre>calldata</code>。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">interface</span><span class="token punctuation">.</span><span class="token function">encodeFunctionData</span><span class="token punctuation">(</span><span class="token string">"balanceOf"</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">"0xc778417e063141139fce010982780140aa0cd5ab"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>decodeFunctionResult()</code>：解码函数的返回值。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">interface</span><span class="token punctuation">.</span><span class="token function">decodeFunctionResult</span><span class="token punctuation">(</span><span class="token string">"balanceOf"</span><span class="token punctuation">,</span> resultData<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
<h2 id="例子-与测试网weth合约交互" tabindex="-1"><a class="header-anchor" href="#例子-与测试网weth合约交互"><span>例子：与测试网<code v-pre>WETH</code>合约交互</span></a></h2>
<p>这里，我们利用接口类编码<code v-pre>calldata</code>的方法，重复<RouteLink to="/ethers/WriteContract.html">第5讲</RouteLink>中与测试网<code v-pre>WETH</code>合约交互的例子。</p>
<ol>
<li>
<p>创建<code v-pre>provider</code>，<code v-pre>wallet</code>变量。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token constant">ALCHEMY_GOERLI_URL</span> <span class="token operator">=</span> <span class="token string">'https://eth-rinkeby.alchemyapi.io/v2/GlaeWuylnNM3uuOo-SAwJxuwTdqHaY5l'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> provider <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>JsonRpcProvider</span><span class="token punctuation">(</span><span class="token constant">ALCHEMY_GOERLI_URL</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 利用私钥和provider创建wallet对象</span></span>
<span class="line"><span class="token keyword">const</span> privateKey <span class="token operator">=</span> <span class="token string">'0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2b'</span></span>
<span class="line"><span class="token keyword">const</span> wallet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>Wallet</span><span class="token punctuation">(</span>privateKey<span class="token punctuation">,</span> provider<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>创建<code v-pre>WETH</code>合约实例</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// WETH的ABI</span></span>
<span class="line"><span class="token keyword">const</span> abiWETH <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">"function balanceOf(address) public view returns(uint)"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">"function deposit() public payable"</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// WETH合约地址（Goerli测试网）</span></span>
<span class="line"><span class="token keyword">const</span> addressWETH <span class="token operator">=</span> <span class="token string">'0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'</span></span>
<span class="line"><span class="token comment">// 声明WETH合约</span></span>
<span class="line"><span class="token keyword">const</span> contractWETH <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>Contract</span><span class="token punctuation">(</span>addressWETH<span class="token punctuation">,</span> abiWETH<span class="token punctuation">,</span> wallet<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>调用<code v-pre>balanceOf()</code>函数，读取钱包地址<code v-pre>address</code>的<code v-pre>WETH</code>余额。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> address <span class="token operator">=</span> <span class="token keyword">await</span> wallet<span class="token punctuation">.</span><span class="token function">getAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 1. 读取WETH合约的链上信息（WETH abi）</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"\n1. 读取WETH余额"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 编码calldata</span></span>
<span class="line"><span class="token keyword">const</span> param1 <span class="token operator">=</span> contractWETH<span class="token punctuation">.</span>interface<span class="token punctuation">.</span><span class="token function">encodeFunctionData</span><span class="token punctuation">(</span></span>
<span class="line">    <span class="token string">"balanceOf"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">[</span>address<span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">编码结果： </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>param1<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 创建交易</span></span>
<span class="line"><span class="token keyword">const</span> tx1 <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">to</span><span class="token operator">:</span> addressWETH<span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">data</span><span class="token operator">:</span> param1</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">// 发起交易，可读操作（view/pure）可以用 provider.call(tx)</span></span>
<span class="line"><span class="token keyword">const</span> balanceWETH <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">provider</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>tx1<span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">存款前WETH持仓: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>ethers<span class="token punctuation">.</span><span class="token function">formatEther</span><span class="token punctuation">(</span>balanceWETH<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\n</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/ethers/img/13-1.png" alt="查看WETH余额"></p>
</li>
<li>
<p>调用<code v-pre>deposit()</code>函数，将<code v-pre>0.001 ETH</code>转换为<code v-pre>0.001 WETH</code>，打印交易详情和余额。可以看到余额变化。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// 编码calldata</span></span>
<span class="line"><span class="token keyword">const</span> param2 <span class="token operator">=</span> contractWETH<span class="token punctuation">.</span>interface<span class="token punctuation">.</span><span class="token function">encodeFunctionData</span><span class="token punctuation">(</span></span>
<span class="line">    <span class="token string">"deposit"</span></span>
<span class="line">    <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">编码结果： </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>param2<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 创建交易</span></span>
<span class="line"><span class="token keyword">const</span> tx2 <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">to</span><span class="token operator">:</span> addressWETH<span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">data</span><span class="token operator">:</span> param2<span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">value</span><span class="token operator">:</span> ethers<span class="token punctuation">.</span><span class="token function">parseEther</span><span class="token punctuation">(</span><span class="token string">"0.001"</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">// 发起交易，写入操作需要 wallet.sendTransaction(tx)</span></span>
<span class="line"><span class="token keyword">const</span> receipt1 <span class="token operator">=</span> <span class="token keyword">await</span> wallet<span class="token punctuation">.</span><span class="token function">sendTransaction</span><span class="token punctuation">(</span>tx2<span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 等待交易上链</span></span>
<span class="line"><span class="token keyword">await</span> receipt1<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">交易详情：</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>receipt1<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">const</span> balanceWETH_deposit <span class="token operator">=</span> <span class="token keyword">await</span> contractWETH<span class="token punctuation">.</span><span class="token function">balanceOf</span><span class="token punctuation">(</span>address<span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">存款后WETH持仓: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>ethers<span class="token punctuation">.</span><span class="token function">formatEther</span><span class="token punctuation">(</span>balanceWETH_deposit<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\n</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/ethers/img/13-2.png" alt="调用deposit()函数"></p>
</li>
</ol>
<h2 id="完整代码" tabindex="-1"><a class="header-anchor" href="#完整代码"><span>完整代码</span></a></h2>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// Interface 接口类</span></span>
<span class="line"><span class="token comment">// 利用abi生成</span></span>
<span class="line"><span class="token comment">// const interface = ethers.Interface(abi)</span></span>
<span class="line"><span class="token comment">// 直接从contract中获取</span></span>
<span class="line"><span class="token comment">// const interface2 = contract.interface</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ethers <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ethers"</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token constant">ALCHEMY_GOERLI_URL</span> <span class="token operator">=</span> <span class="token string">'https://eth-goerli.alchemyapi.io/v2/GlaeWuylnNM3uuOo-SAwJxuwTdqHaY5l'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> provider <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>JsonRpcProvider</span><span class="token punctuation">(</span><span class="token constant">ALCHEMY_GOERLI_URL</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 利用私钥和provider创建wallet对象</span></span>
<span class="line"><span class="token keyword">const</span> privateKey <span class="token operator">=</span> <span class="token string">'0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b'</span></span>
<span class="line"><span class="token keyword">const</span> wallet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>Wallet</span><span class="token punctuation">(</span>privateKey<span class="token punctuation">,</span> provider<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// WETH的ABI</span></span>
<span class="line"><span class="token keyword">const</span> abiWETH <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">"function balanceOf(address) public view returns(uint)"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">"function deposit() public payable"</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// WETH合约地址（Goerli测试网）</span></span>
<span class="line"><span class="token keyword">const</span> addressWETH <span class="token operator">=</span> <span class="token string">'0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 声明WETH合约</span></span>
<span class="line"><span class="token keyword">const</span> contractWETH <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>Contract</span><span class="token punctuation">(</span>addressWETH<span class="token punctuation">,</span> abiWETH<span class="token punctuation">,</span> wallet<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">main</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">const</span> address <span class="token operator">=</span> <span class="token keyword">await</span> wallet<span class="token punctuation">.</span><span class="token function">getAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">// 1. 读取WETH合约的链上信息（WETH abi）</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"\n1. 读取WETH余额"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">// 编码calldata</span></span>
<span class="line">    <span class="token keyword">const</span> param1 <span class="token operator">=</span> contractWETH<span class="token punctuation">.</span>interface<span class="token punctuation">.</span><span class="token function">encodeFunctionData</span><span class="token punctuation">(</span></span>
<span class="line">        <span class="token string">"balanceOf"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">[</span>address<span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">编码结果： </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>param1<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">// 创建交易</span></span>
<span class="line">    <span class="token keyword">const</span> tx1 <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">to</span><span class="token operator">:</span> addressWETH<span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">data</span><span class="token operator">:</span> param1</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token comment">// 发起交易，可读操作（view/pure）可以用 provider.call(tx)</span></span>
<span class="line">    <span class="token keyword">const</span> balanceWETH <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">provider</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>tx1<span class="token punctuation">)</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">存款前WETH持仓: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>ethers<span class="token punctuation">.</span><span class="token function">formatEther</span><span class="token punctuation">(</span>balanceWETH<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\n</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">//读取钱包内ETH余额</span></span>
<span class="line">    <span class="token keyword">const</span> balanceETH <span class="token operator">=</span> <span class="token keyword">await</span> provider<span class="token punctuation">.</span><span class="token function">getBalance</span><span class="token punctuation">(</span>wallet<span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">// 如果钱包ETH足够</span></span>
<span class="line">    <span class="token keyword">if</span><span class="token punctuation">(</span>ethers<span class="token punctuation">.</span><span class="token function">formatEther</span><span class="token punctuation">(</span>balanceETH<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0.0015</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// 2. 调用deposit()函数，将0.001 ETH转为WETH</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"\n2. 调用deposit()函数，存入0.001 ETH"</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token comment">// 编码calldata</span></span>
<span class="line">        <span class="token keyword">const</span> param2 <span class="token operator">=</span> contractWETH<span class="token punctuation">.</span>interface<span class="token punctuation">.</span><span class="token function">encodeFunctionData</span><span class="token punctuation">(</span></span>
<span class="line">            <span class="token string">"deposit"</span></span>
<span class="line">            <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">编码结果： </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>param2<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token comment">// 创建交易</span></span>
<span class="line">        <span class="token keyword">const</span> tx2 <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token literal-property property">to</span><span class="token operator">:</span> addressWETH<span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">data</span><span class="token operator">:</span> param2<span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">value</span><span class="token operator">:</span> ethers<span class="token punctuation">.</span><span class="token function">parseEther</span><span class="token punctuation">(</span><span class="token string">"0.001"</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span>
<span class="line">        <span class="token comment">// 发起交易，写入操作需要 wallet.sendTransaction(tx)</span></span>
<span class="line">        <span class="token keyword">const</span> receipt1 <span class="token operator">=</span> <span class="token keyword">await</span> wallet<span class="token punctuation">.</span><span class="token function">sendTransaction</span><span class="token punctuation">(</span>tx2<span class="token punctuation">)</span></span>
<span class="line">        <span class="token comment">// 等待交易上链</span></span>
<span class="line">        <span class="token keyword">await</span> receipt1<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">交易详情：</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>receipt1<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">const</span> balanceWETH_deposit <span class="token operator">=</span> <span class="token keyword">await</span> contractWETH<span class="token punctuation">.</span><span class="token function">balanceOf</span><span class="token punctuation">(</span>address<span class="token punctuation">)</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">存款后WETH持仓: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>ethers<span class="token punctuation">.</span><span class="token function">formatEther</span><span class="token punctuation">(</span>balanceWETH_deposit<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\n</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 如果ETH不足</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"ETH不足，去水龙头领一些Goerli ETH"</span><span class="token punctuation">)</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"1. chainlink水龙头: https://faucets.chain.link/goerli"</span><span class="token punctuation">)</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"2. paradigm水龙头: https://faucet.paradigm.xyz/"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


