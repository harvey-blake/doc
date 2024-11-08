<template><div><Layout/><h1 id="_14-批量生成钱包" tabindex="-1"><a class="header-anchor" href="#_14-批量生成钱包"><span>14. 批量生成钱包</span></a></h1>
<p>我们将介绍HD钱包，并写一个批量生成钱包的脚本。</p>
<h2 id="hd钱包" tabindex="-1"><a class="header-anchor" href="#hd钱包"><span>HD钱包</span></a></h2>
<p>HD钱包（Hierarchical Deterministic Wallet，多层确定性钱包）是一种数字钱包 ，通常用于存储比特币和以太坊等加密货币持有者的数字密钥。通过它，用户可以从一个随机种子创建一系列密钥对，更加便利、安全、隐私。要理解HD钱包，我们需要简单了解比特币的<a href="https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki" target="_blank" rel="noopener noreferrer">BIP32</a>，<a href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki" target="_blank" rel="noopener noreferrer">BIP44</a>，和<a href="https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki" target="_blank" rel="noopener noreferrer">BIP39</a>。</p>
<h3 id="bip32" tabindex="-1"><a class="header-anchor" href="#bip32"><span>BIP32</span></a></h3>
<p>在<code v-pre>BIP32</code>推出之前，用户需要记录一堆的私钥才能管理很多钱包。<code v-pre>BIP32</code>提出可以用一个随机种子衍生多个私钥，更方便的管理多个钱包。钱包的地址由衍生路径决定，例如<code v-pre>“m/0/0/1”</code>。</p>
<p><img src="@source/ethers/img/14-1.png" alt="BIP32"></p>
<h3 id="bip44" tabindex="-1"><a class="header-anchor" href="#bip44"><span>BIP44</span></a></h3>
<p><code v-pre>BIP44</code>为<code v-pre>BIP32</code>的衍生路径提供了一套通用规范，适配比特币、以太坊等多链。这一套规范包含六级，每级之间用&quot;/&quot;分割：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">m / purpose' / coin_type' / account' / change / address_index</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>其中：</p>
<ul>
<li>m: 固定为&quot;m&quot;</li>
<li>purpose：固定为&quot;44&quot;</li>
<li>coin_type：代币类型，比特币主网为0，比特币测试网为1，以太坊主网为60</li>
<li>account：账户索引，从0开始。</li>
<li>change：是否为外部链，0为外部链，1为内部链，一般填0.</li>
<li>address_index：地址索引，从0开始，想生成新地址就把这里改为1，2，3。</li>
</ul>
<p>举个例子，以太坊的默认衍生路径为<code v-pre>&quot;m/44'/60'/0'/0/0&quot;</code>。</p>
<h3 id="bip39" tabindex="-1"><a class="header-anchor" href="#bip39"><span>BIP39</span></a></h3>
<p><code v-pre>BIP39</code>让用户能以一些人类可记忆的助记词的方式保管私钥，而不是一串16进制的数字：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">//私钥</span>
<span class="line">0x813f8f0a4df26f6455814fdd07dd2ab2d0e2d13f4d2f3c66e7fd9e3856060f89</span>
<span class="line">//助记词</span>
<span class="line">air organ twist rule prison symptom jazz cheap rather dizzy verb glare jeans orbit weapon universe require tired sing casino business anxiety seminar hunt</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="批量生成钱包" tabindex="-1"><a class="header-anchor" href="#批量生成钱包"><span>批量生成钱包</span></a></h2>
<p><code v-pre>ethers.js</code>提供了<a href="https://docs.ethers.org/v6-beta/api/wallet/#HDNodeWallet" target="_blank" rel="noopener noreferrer">HDNodeWallet类</a>，方便开发者使用HD钱包。下面我们利用它从一个助记词批量生成20个钱包。</p>
<ol>
<li>
<p>创建<code v-pre>baseWallet</code>钱包变量，可以看到助记词为<code v-pre>'air organ twist rule prison symptom jazz cheap rather dizzy verb glare jeans orbit weapon universe require tired sing casino business anxiety seminar hunt'</code></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// 生成随机助记词</span></span>
<span class="line"><span class="token keyword">const</span> mnemonic <span class="token operator">=</span> ethers<span class="token punctuation">.</span>Mnemonic<span class="token punctuation">.</span><span class="token function">entropyToPhrase</span><span class="token punctuation">(</span>ethers<span class="token punctuation">.</span><span class="token function">randomBytes</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 创建HD基钱包</span></span>
<span class="line"><span class="token comment">// 基路径："m / purpose' / coin_type' / account' / change"</span></span>
<span class="line"><span class="token keyword">const</span> basePath <span class="token operator">=</span> <span class="token string">"44'/60'/0'/0"</span></span>
<span class="line"><span class="token keyword">const</span> baseWallet <span class="token operator">=</span> ethers<span class="token punctuation">.</span>HDNodeWallet<span class="token punctuation">.</span><span class="token function">fromPhrase</span><span class="token punctuation">(</span>mnemonic<span class="token punctuation">,</span> basePath<span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>baseWallet<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/ethers/img/14-2.png" alt="baseWallet"></p>
</li>
<li>
<p>通过HD钱包派生20个钱包。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> numWallet <span class="token operator">=</span> <span class="token number">20</span></span>
<span class="line"><span class="token comment">// 派生路径：基路径 + "/ address_index"</span></span>
<span class="line"><span class="token comment">// 我们只需要提供最后一位address_index的字符串格式，就可以从baseWallet派生出新钱包。V6中不需要重复提供基路径！</span></span>
<span class="line"><span class="token keyword">let</span> wallets <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> numWallet<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> baseWalletNew <span class="token operator">=</span> baseWallet<span class="token punctuation">.</span><span class="token function">derivePath</span><span class="token punctuation">(</span>i<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">第</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">个钱包地址： </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>baseWalletNew<span class="token punctuation">.</span>address<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line">    wallets<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>baseWalletNew<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/ethers/img/14-3.png" alt="批量生成钱包"></p>
</li>
<li>
<p>保存钱包为加密json：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> wallet <span class="token operator">=</span> ethers<span class="token punctuation">.</span>Wallet<span class="token punctuation">.</span><span class="token function">fromPhrase</span><span class="token punctuation">(</span>mnemonic<span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"通过助记词创建钱包："</span><span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>wallet<span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 加密json用的密码，可以更改成别的</span></span>
<span class="line"><span class="token keyword">const</span> pwd <span class="token operator">=</span> <span class="token string">"password"</span></span>
<span class="line"><span class="token keyword">const</span> json <span class="token operator">=</span> <span class="token keyword">await</span> wallet<span class="token punctuation">.</span><span class="token function">encrypt</span><span class="token punctuation">(</span>pwd<span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"钱包的加密json："</span><span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/ethers/img/14-4.png" alt="保存钱包"></p>
</li>
<li>
<p>从加密json中读取钱包：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> wallet2 <span class="token operator">=</span> <span class="token keyword">await</span> ethers<span class="token punctuation">.</span>Wallet<span class="token punctuation">.</span><span class="token function">fromEncryptedJson</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> pwd<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"\n4. 从加密json读取钱包："</span><span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>wallet2<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/ethers/img/14-5.png" alt="读取钱包"></p>
</li>
</ol>
<h2 id="完整代码" tabindex="-1"><a class="header-anchor" href="#完整代码"><span>完整代码</span></a></h2>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ethers <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ethers"</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 1. 创建HD钱包 (ethers V6)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"\n1. 创建HD钱包"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 生成随机助记词</span></span>
<span class="line"><span class="token keyword">const</span> mnemonic <span class="token operator">=</span> ethers<span class="token punctuation">.</span>Mnemonic<span class="token punctuation">.</span><span class="token function">entropyToPhrase</span><span class="token punctuation">(</span>ethers<span class="token punctuation">.</span><span class="token function">randomBytes</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 创建HD基钱包</span></span>
<span class="line"><span class="token comment">// 基路径："m / purpose' / coin_type' / account' / change"</span></span>
<span class="line"><span class="token keyword">const</span> basePath <span class="token operator">=</span> <span class="token string">"44'/60'/0'/0"</span></span>
<span class="line"><span class="token keyword">const</span> baseWallet <span class="token operator">=</span> ethers<span class="token punctuation">.</span>HDNodeWallet<span class="token punctuation">.</span><span class="token function">fromPhrase</span><span class="token punctuation">(</span>mnemonic<span class="token punctuation">,</span> basePath<span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>baseWallet<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 2. 通过HD钱包派生20个钱包</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"\n2. 通过HD钱包派生20个钱包"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">const</span> numWallet <span class="token operator">=</span> <span class="token number">20</span></span>
<span class="line"><span class="token comment">// 派生路径：基路径 + "/ address_index"</span></span>
<span class="line"><span class="token comment">// 我们只需要提供最后一位address_index的字符串格式，就可以从baseWallet派生出新钱包。V6中不需要重复提供基路径！</span></span>
<span class="line"><span class="token keyword">let</span> wallets <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> numWallet<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">let</span> baseWalletNew <span class="token operator">=</span> baseWallet<span class="token punctuation">.</span><span class="token function">derivePath</span><span class="token punctuation">(</span>i<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">第</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">个钱包地址： </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>baseWalletNew<span class="token punctuation">.</span>address<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line">    wallets<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>baseWalletNew<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 3. 保存钱包（加密json）</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"\n3. 保存钱包（加密json）"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">const</span> wallet <span class="token operator">=</span> ethers<span class="token punctuation">.</span>Wallet<span class="token punctuation">.</span><span class="token function">fromPhrase</span><span class="token punctuation">(</span>mnemonic<span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"通过助记词创建钱包："</span><span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>wallet<span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 加密json用的密码，可以更改成别的</span></span>
<span class="line"><span class="token keyword">const</span> pwd <span class="token operator">=</span> <span class="token string">"password"</span></span>
<span class="line"><span class="token keyword">const</span> json <span class="token operator">=</span> <span class="token keyword">await</span> wallet<span class="token punctuation">.</span><span class="token function">encrypt</span><span class="token punctuation">(</span>pwd<span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"钱包的加密json："</span><span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 4. 从加密json读取钱包</span></span>
<span class="line"><span class="token keyword">const</span> wallet2 <span class="token operator">=</span> <span class="token keyword">await</span> ethers<span class="token punctuation">.</span>Wallet<span class="token punctuation">.</span><span class="token function">fromEncryptedJson</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> pwd<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"\n4. 从加密json读取钱包："</span><span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>wallet2<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


