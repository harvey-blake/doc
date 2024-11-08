<template><div><Layout/><h1 id="_26-eip712-签名脚本" tabindex="-1"><a class="header-anchor" href="#_26-eip712-签名脚本"><span>26. EIP712 签名脚本</span></a></h1>
<p>在本教程中，我们将介绍如何使用 Ethers.js 写 EIP712 签名脚本。</p>
<h2 id="eip712" tabindex="-1"><a class="header-anchor" href="#eip712"><span>EIP712</span></a></h2>
<p><a href="https://eips.ethereum.org/EIPS/eip-712" target="_blank" rel="noopener noreferrer">EIP712 类型化数据签名</a>提供了一种更高级、更安全的签名方法。当支持 EIP712 的 Dapp 请求签名时，钱包会展示签名消息的原始数据，用户可以在验证数据符合预期之后签名。此外，你也可以使用脚本生成 EIP712 签名。</p>
<h2 id="eip712-签名脚本" tabindex="-1"><a class="header-anchor" href="#eip712-签名脚本"><span>EIP712 签名脚本</span></a></h2>
<ol>
<li>
<p>创建 <code v-pre>provider</code> 和 <code v-pre>wallet</code> 对象。在本例中，我们使用 Remix 测试钱包的私钥。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// 使用 Alchemy 的 RPC 节点连接以太坊网络</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token constant">ALCHEMY_GOERLI_URL</span> <span class="token operator">=</span> <span class="token string">'https://eth-goerli.alchemyapi.io/v2/GlaeWuylnNM3uuOo-SAwJxuwTdqHaY5l'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> provider <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>JsonRpcProvider</span><span class="token punctuation">(</span><span class="token constant">ALCHEMY_GOERLI_URL</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 使用私钥和 provider 创建 wallet 对象</span></span>
<span class="line"><span class="token keyword">const</span> privateKey <span class="token operator">=</span> <span class="token string">'0x503f38a9c967ed597e47fe25643985f032b072db8075426a92110f82df48dfcb'</span></span>
<span class="line"><span class="token keyword">const</span> wallet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>Wallet</span><span class="token punctuation">(</span>privateKey<span class="token punctuation">,</span> provider<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>创建 EIP712 Domain，它包含了合约的 <code v-pre>name</code>、<code v-pre>version</code>（通常约定为 “1”）、<code v-pre>chainId</code> 以及 <code v-pre>verifyingContract</code>（验证签名的合约地址）。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// 创建 EIP712 Domain</span></span>
<span class="line"><span class="token keyword">let</span> contractName <span class="token operator">=</span> <span class="token string">"EIP712Storage"</span></span>
<span class="line"><span class="token keyword">let</span> version <span class="token operator">=</span> <span class="token string">"1"</span></span>
<span class="line"><span class="token keyword">let</span> chainId <span class="token operator">=</span> <span class="token string">"1"</span></span>
<span class="line"><span class="token keyword">let</span> contractAddress <span class="token operator">=</span> <span class="token string">"0xf8e81D47203A594245E36C48e151709F0C19fBe8"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> domain <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">name</span><span class="token operator">:</span> contractName<span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">version</span><span class="token operator">:</span> version<span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">chainId</span><span class="token operator">:</span> chainId<span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">verifyingContract</span><span class="token operator">:</span> contractAddress<span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>创建签名消息的类型化数据，其中 <code v-pre>types</code> 声明类型，而 <code v-pre>message</code> 包含数据。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// 创建类型化数据，Storage</span></span>
<span class="line"><span class="token keyword">let</span> spender <span class="token operator">=</span> <span class="token string">"0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"</span></span>
<span class="line"><span class="token keyword">let</span> number <span class="token operator">=</span> <span class="token string">"100"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> types <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">Storage</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"spender"</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"address"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"number"</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"uint256"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> message <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">spender</span><span class="token operator">:</span> spender<span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">number</span><span class="token operator">:</span> number<span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>调用 wallet 对象的 <code v-pre>signTypedData()</code> 签名方法，参数为之前创建的 <code v-pre>domain</code>、<code v-pre>types</code> 和 <code v-pre>message</code> 变量：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// EIP712 签名</span></span>
<span class="line"><span class="token keyword">const</span> signature <span class="token operator">=</span> <span class="token keyword">await</span> wallet<span class="token punctuation">.</span><span class="token function">signTypedData</span><span class="token punctuation">(</span>domain<span class="token punctuation">,</span> types<span class="token punctuation">,</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Signature:"</span><span class="token punctuation">,</span> signature<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// Signature: 0xdca07f0c1dc70a4f9746a7b4be145c3bb8c8503368e94e3523ea2e8da6eba7b61f260887524f015c82dd77ebd3c8938831c60836f905098bf71b3e6a4a09b7311b</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>你可以使用 <code v-pre>verifyTypedData()</code> 方法复原出签名的 <code v-pre>signer</code> 地址并验证签名的有效性。通常，这一步会在智能合约中执行。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// 验证 EIP712 签名，从签名和消息复原出 signer 地址</span></span>
<span class="line"><span class="token keyword">let</span> eip712Signer <span class="token operator">=</span> ethers<span class="token punctuation">.</span><span class="token function">verifyTypedData</span><span class="token punctuation">(</span>domain<span class="token punctuation">,</span> types<span class="token punctuation">,</span> message<span class="token punctuation">,</span> signature<span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"EIP712 Signer: "</span><span class="token punctuation">,</span> eip712Signer<span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">//EIP712 Signer: 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="完整代码" tabindex="-1"><a class="header-anchor" href="#完整代码"><span>完整代码</span></a></h2>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ethers <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ethers"</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 利用Alchemy的rpc节点连接以太坊网络</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token constant">ALCHEMY_GOERLI_URL</span> <span class="token operator">=</span> <span class="token string">'https://eth-goerli.alchemyapi.io/v2/GlaeWuylnNM3uuOo-SAwJxuwTdqHaY5l'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> provider <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>JsonRpcProvider</span><span class="token punctuation">(</span><span class="token constant">ALCHEMY_GOERLI_URL</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 利用私钥和provider创建wallet对象</span></span>
<span class="line"><span class="token keyword">const</span> privateKey <span class="token operator">=</span> <span class="token string">'0x503f38a9c967ed597e47fe25643985f032b072db8075426a92110f82df48dfcb'</span></span>
<span class="line"><span class="token keyword">const</span> wallet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>Wallet</span><span class="token punctuation">(</span>privateKey<span class="token punctuation">,</span> provider<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 创建 EIP712 Domain</span></span>
<span class="line"><span class="token keyword">let</span> contractName <span class="token operator">=</span> <span class="token string">"EIP712Storage"</span></span>
<span class="line"><span class="token keyword">let</span> version <span class="token operator">=</span> <span class="token string">"1"</span></span>
<span class="line"><span class="token keyword">let</span> chainId <span class="token operator">=</span> <span class="token string">"1"</span></span>
<span class="line"><span class="token keyword">let</span> contractAddress <span class="token operator">=</span> <span class="token string">"0xf8e81D47203A594245E36C48e151709F0C19fBe8"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> domain <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">name</span><span class="token operator">:</span> contractName<span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">version</span><span class="token operator">:</span> version<span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">chainId</span><span class="token operator">:</span> chainId<span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">verifyingContract</span><span class="token operator">:</span> contractAddress<span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 创建类型化数据，Storage</span></span>
<span class="line"><span class="token keyword">let</span> spender <span class="token operator">=</span> <span class="token string">"0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"</span></span>
<span class="line"><span class="token keyword">let</span> number <span class="token operator">=</span> <span class="token string">"100"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> types <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">Storage</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"spender"</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"address"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"number"</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"uint256"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> message <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">spender</span><span class="token operator">:</span> spender<span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">number</span><span class="token operator">:</span> number<span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">main</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Message: "</span><span class="token punctuation">,</span> message<span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">// EIP712 签名</span></span>
<span class="line">    <span class="token keyword">const</span> signature <span class="token operator">=</span> <span class="token keyword">await</span> wallet<span class="token punctuation">.</span><span class="token function">signTypedData</span><span class="token punctuation">(</span>domain<span class="token punctuation">,</span> types<span class="token punctuation">,</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Signature:"</span><span class="token punctuation">,</span> signature<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token comment">// 验证 EIP712 签名，从签名和消息复原出 signer 地址</span></span>
<span class="line">    <span class="token keyword">let</span> eip712Signer <span class="token operator">=</span> ethers<span class="token punctuation">.</span><span class="token function">verifyTypedData</span><span class="token punctuation">(</span>domain<span class="token punctuation">,</span> types<span class="token punctuation">,</span> message<span class="token punctuation">,</span> signature<span class="token punctuation">)</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"EIP712 Signer: "</span><span class="token punctuation">,</span> eip712Signer<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


