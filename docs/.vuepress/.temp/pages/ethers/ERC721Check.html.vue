<template><div><Layout/><h1 id="_12-识别erc721合约" tabindex="-1"><a class="header-anchor" href="#_12-识别erc721合约"><span>12. 识别ERC721合约</span></a></h1>
<p>我们介绍如何用<code v-pre>ether.js</code>识别一个合约是否为<code v-pre>ERC721</code>标准。</p>
<h2 id="erc721" tabindex="-1"><a class="header-anchor" href="#erc721"><span><code v-pre>ERC721</code></span></a></h2>
<p><code v-pre>ERC721</code>是以太坊上流行的非同质化代币（NFT）标准。在做NFT相关产品时，我们需要筛选出符合<code v-pre>ERC721</code>标准的合约。例如Opensea，他会自动识别<code v-pre>ERC721</code>，并爬下它的名称、代号、metadata等数据用于展示。要识别<code v-pre>ERC721</code>，我们先要理解<code v-pre>ERC165</code>。</p>
<h2 id="erc165" tabindex="-1"><a class="header-anchor" href="#erc165"><span><code v-pre>ERC165</code></span></a></h2>
<p>通过<a href="https://eips.ethereum.org/EIPS/eip-165" target="_blank" rel="noopener noreferrer">ERC165标准</a>，智能合约可以声明它支持的接口，供其他合约检查。因此，我们可以通过<code v-pre>ERC165</code>来检查一个智能合约是不是支持了<code v-pre>ERC721</code>的接口。</p>
<p><code v-pre>IERC165</code>接口合约只声明了一个<code v-pre>supportsInterface</code>函数，输入要查询的<code v-pre>interfaceId</code>接口id（类型为<code v-pre>bytes4</code>），若合约实现了该接口id，则返回<code v-pre>true</code>；反之，则返回<code v-pre>false</code>：</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line"><span class="token keyword">interface</span> <span class="token class-name">IERC165</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">/**</span>
<span class="line">     * @dev 如果合约实现了查询的`interfaceId`，则返回true</span>
<span class="line">     * 规则详见：https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section]</span>
<span class="line">     *</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">supportsInterface</span><span class="token punctuation">(</span><span class="token builtin">bytes4</span> interfaceId<span class="token punctuation">)</span> <span class="token keyword">external</span> <span class="token keyword">view</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token builtin">bool</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>ERC721</code>合约中会实现<code v-pre>IERC165</code>接口合约的<code v-pre>supportsInterface</code>函数，并且当查询<code v-pre>0x80ac58cd</code>（<code v-pre>ERC721</code>接口id）时返回<code v-pre>true</code>。</p>
<div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre v-pre><code><span class="line">   <span class="token keyword">function</span> <span class="token function">supportsInterface</span><span class="token punctuation">(</span><span class="token builtin">bytes4</span> interfaceId<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">external</span></span>
<span class="line">        <span class="token keyword">pure</span></span>
<span class="line">        override</span>
<span class="line">        <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token builtin">bool</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span></span>
<span class="line">            interfaceId <span class="token operator">==</span> <span class="token function">type</span><span class="token punctuation">(</span>IERC721<span class="token punctuation">)</span><span class="token punctuation">.</span>interfaceId</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="识别erc721" tabindex="-1"><a class="header-anchor" href="#识别erc721"><span>识别<code v-pre>ERC721</code></span></a></h2>
<ol>
<li>
<p>创建<code v-pre>provider</code>，连接以太坊主网。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token constant">ALCHEMY_MAINNET_URL</span> <span class="token operator">=</span> <span class="token string">'https://eth-mainnet.g.alchemy.com/v2/oKmOQKbneVkxgHZfibs-iFhIlIAl6HDN'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> provider <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>JsonRpcProvider</span><span class="token punctuation">(</span><span class="token constant">ALCHEMY_MAINNET_URL</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>创建<code v-pre>ERC721</code>合约实例，在<code v-pre>abi</code>接口中，我们声明要使用的<code v-pre>name()</code>，<code v-pre>symbol()</code>，和<code v-pre>supportsInterface()</code>函数即可。这里我们用的BAYC的合约地址。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// 合约abi</span></span>
<span class="line"><span class="token keyword">const</span> abiERC721 <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">"function name() view returns (string)"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">"function symbol() view returns (string)"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">"function supportsInterface(bytes4) public view returns(bool)"</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// ERC721的合约地址，这里用的BAYC</span></span>
<span class="line"><span class="token keyword">const</span> addressBAYC <span class="token operator">=</span> <span class="token string">"0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"</span></span>
<span class="line"><span class="token comment">// 创建ERC721合约实例</span></span>
<span class="line"><span class="token keyword">const</span> contractERC721 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>Contract</span><span class="token punctuation">(</span>addressBAYC<span class="token punctuation">,</span> abiERC721<span class="token punctuation">,</span> provider<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>读取合约的链上信息：名称和代号。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// 1. 读取ERC721合约的链上信息</span></span>
<span class="line"><span class="token keyword">const</span> nameERC721 <span class="token operator">=</span> <span class="token keyword">await</span> contractERC721<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">const</span> symbolERC721 <span class="token operator">=</span> <span class="token keyword">await</span> contractERC721<span class="token punctuation">.</span><span class="token function">symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"\n1. 读取ERC721合约信息"</span><span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">合约地址: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>addressBAYC<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">名称: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>nameERC721<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">代号: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>symbolERC721<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/ethers/img/12-1.png" alt="读取合约名称和代好"></p>
</li>
<li>
<p>利用<code v-pre>ERC165</code>的<code v-pre>supportsInterface()</code>函数，识别合约是否为ERC721标准。如果是，则返回<code v-pre>true</code>；反之，则报错或返回<code v-pre>false</code>。</p>
<p>注意此处的代码中的<code v-pre>selectorERC721</code>常量被提取出main函数</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// 2. 利用ERC165的supportsInterface，确定合约是否为ERC721标准</span></span>
<span class="line"><span class="token comment">// ERC721接口的ERC165 identifier</span></span>
<span class="line"><span class="token keyword">const</span> selectorERC721 <span class="token operator">=</span> <span class="token string">"0x80ac58cd"</span></span>
<span class="line"><span class="token keyword">const</span> isERC721 <span class="token operator">=</span> <span class="token keyword">await</span> contractERC721<span class="token punctuation">.</span><span class="token function">supportsInterface</span><span class="token punctuation">(</span>selectorERC721<span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"\n2. 利用ERC165的supportsInterface，确定合约是否为ERC721标准"</span><span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">合约是否为ERC721标准: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>isERC721<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/ethers/img/12-2.png" alt="识别ERC721"></p>
</li>
</ol>
<h2 id="完整代码" tabindex="-1"><a class="header-anchor" href="#完整代码"><span>完整代码</span></a></h2>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ethers <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ethers"</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token constant">ALCHEMY_MAINNET_URL</span> <span class="token operator">=</span> <span class="token string">'https://eth-mainnet.g.alchemy.com/v2/oKmOQKbneVkxgHZfibs-iFhIlIAl6HDN'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> provider <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>JsonRpcProvider</span><span class="token punctuation">(</span><span class="token constant">ALCHEMY_MAINNET_URL</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 合约abi</span></span>
<span class="line"><span class="token keyword">const</span> abiERC721 <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">"function name() view returns (string)"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">"function symbol() view returns (string)"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">"function supportsInterface(bytes4) public view returns(bool)"</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// ERC721的合约地址，这里用的BAYC</span></span>
<span class="line"><span class="token keyword">const</span> addressBAYC <span class="token operator">=</span> <span class="token string">"0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"</span></span>
<span class="line"><span class="token comment">// 创建ERC721合约实例</span></span>
<span class="line"><span class="token keyword">const</span> contractERC721 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>Contract</span><span class="token punctuation">(</span>addressBAYC<span class="token punctuation">,</span> abiERC721<span class="token punctuation">,</span> provider<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// ERC721接口的ERC165 identifier</span></span>
<span class="line"><span class="token keyword">const</span> selectorERC721 <span class="token operator">=</span> <span class="token string">"0x80ac58cd"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">main</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 1. 读取ERC721合约的链上信息</span></span>
<span class="line">    <span class="token keyword">const</span> nameERC721 <span class="token operator">=</span> <span class="token keyword">await</span> contractERC721<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">const</span> symbolERC721 <span class="token operator">=</span> <span class="token keyword">await</span> contractERC721<span class="token punctuation">.</span><span class="token function">symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"\n1. 读取ERC721合约信息"</span><span class="token punctuation">)</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">合约地址: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>addressBAYC<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">名称: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>nameERC721<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">代号: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>symbolERC721<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 2. 利用ERC165的supportsInterface，确定合约是否为ERC721标准</span></span>
<span class="line">    <span class="token keyword">const</span> isERC721 <span class="token operator">=</span> <span class="token keyword">await</span> contractERC721<span class="token punctuation">.</span><span class="token function">supportsInterface</span><span class="token punctuation">(</span>selectorERC721<span class="token punctuation">)</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"\n2. 利用ERC165的supportsInterface，确定合约是否为ERC721标准"</span><span class="token punctuation">)</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">合约是否为ERC721标准: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>isERC721<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 如果不是ERC721，则会报错</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


