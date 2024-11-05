<template>
	<div>
		<h1 id="_11-staticcall" tabindex="-1">
			<a class="header-anchor" href="#_11-staticcall"><span>11. StaticCall</span></a>
		</h1>
		<p>介绍合约类的<code v-pre>staticCall</code>方法，在发送交易之前检查交易是否会失败，节省大量gas。</p>
		<p><code v-pre>staticCall</code>方法是属于<code v-pre>ethers.Contract</code>类的编写方法分析，同类的还有<code v-pre>populateTransaction</code>和<code v-pre>estimateGas</code>方法。</p>
		<h2 id="可能失败的交易" tabindex="-1">
			<a class="header-anchor" href="#可能失败的交易"><span>可能失败的交易</span></a>
		</h2>
		<p>在以太坊上发交易需要付昂贵的<code v-pre>gas</code>，并且有失败的风险，发送失败的交易并不会把<code v-pre>gas</code>返还给你。因此，在发送交易前知道哪些交易可能会失败非常重要。如果你用过<code v-pre>metamask</code>小狐狸钱包，那对下图不会陌生。</p>
		<p><img src="@source/ethers/img/11-1.png" alt="你的交易可能失败！" /></p>
		<p>如果你的交易将失败，小狐狸会告诉你<code v-pre>this transaction may fail</code>，翻译过来就是“这笔交易可能失败”。当用户看到这个红字提示，就知道要取消这笔交易了，除非他想尝尝失败的滋味。</p>
		<p>它是怎么做到的呢？这是因为以太坊节点有一个<code v-pre>eth_call</code>方法，让用户可以模拟一笔交易，并返回可能的交易结果，但不真正在区块链上执行它（交易不上链）。</p>
		<h2 id="staticcall" tabindex="-1">
			<a class="header-anchor" href="#staticcall"
				><span><code v-pre>staticCall</code></span></a
			>
		</h2>
		<p>在 ethers.js 中，你可以使用 <code v-pre>contract.函数名.staticCall()</code> 方法来模拟执行一个可能会改变状态的函数，但不实际向区块链提交这个状态改变。这相当于调用以太坊节点的 <code v-pre>eth_call</code>。这通常用于模拟状态改变函数的结果。如果函数调用成功，它将返回函数本身的返回值；如果函数调用失败，它将抛出异常。</p>
		<p>请注意，这种调用适用于任何函数，无论它在智能合约中是标记为 view/pure 还是普通的状态改变函数。它使你能够安全地预测状态改变操作的结果，而不实际执行这些操作。</p>
		<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js">
			<pre v-pre><code><span class="line">    <span class="token keyword">const</span> tx <span class="token operator">=</span> <span class="token keyword">await</span> contract<span class="token punctuation">.</span>函数名<span class="token punctuation">.</span><span class="token function">staticCall</span><span class="token punctuation">(</span> 参数<span class="token punctuation">,</span> <span class="token punctuation">{</span>override<span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">交易会成功吗？：</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> tx<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
			<div class="line-numbers" aria-hidden="true" style="counter-reset: line-number 0">
				<div class="line-number"></div>
				<div class="line-number"></div>
			</div>
		</div>
		<ul>
			<li>函数名：为模拟调用的函数名。</li>
			<li>参数：调用函数的参数。</li>
			<li>
				{override}：选填，可包含以下参数：
				<ul>
					<li><code v-pre>from</code>：执行时的<code v-pre>msg.sender</code>，也就是你可以模拟任何一个人的调用，比如Vitalik。</li>
					<li><code v-pre>value</code>：执行时的<code v-pre>msg.value</code>。</li>
					<li><code v-pre>blockTag</code>：执行时的区块高度。</li>
					<li><code v-pre>gasPrice</code></li>
					<li><code v-pre>gasLimit</code></li>
					<li><code v-pre>nonce</code></li>
				</ul>
			</li>
		</ul>
		<h2 id="用staticcall模拟dai转账" tabindex="-1">
			<a class="header-anchor" href="#用staticcall模拟dai转账"
				><span>用<code v-pre>staticCall</code>模拟<code v-pre>DAI</code>转账</span></a
			>
		</h2>
		<ol>
			<li>
				<p>创建<code v-pre>provider</code>和<code v-pre>wallet</code>对象。</p>
				<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js">
					<pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ethers <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ethers"</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"></span></span>
<span class="line"><span class="token keyword">const</span> <span class="token constant">ALCHEMY_MAINNET_URL</span> <span class="token operator">=</span> <span class="token string">'https://eth-mainnet.g.alchemy.com/v2/oKmOQKbneVkxgHZfibs-iFhIlIAl6HDN'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> provider <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>JsonRpcProvider</span><span class="token punctuation">(</span><span class="token constant">ALCHEMY_MAINNET_URL</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 利用私钥和provider创建wallet对象</span></span>
<span class="line"><span class="token keyword">const</span> privateKey <span class="token operator">=</span> <span class="token string">'0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2b'</span></span>
<span class="line"><span class="token keyword">const</span> wallet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>Wallet</span><span class="token punctuation">(</span>privateKey<span class="token punctuation">,</span> provider<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
					<div class="line-numbers" aria-hidden="true" style="counter-reset: line-number 0">
						<div class="line-number"></div>
						<div class="line-number"></div>
						<div class="line-number"></div>
						<div class="line-number"></div>
						<div class="line-number"></div>
						<div class="line-number"></div>
						<div class="line-number"></div>
						<div class="line-number"></div>
						<div class="line-number"></div>
					</div>
				</div>
			</li>
			<li>
				<p>创建<code v-pre>DAI</code>合约对象，注意，这里生成合约时要用<code v-pre>provider</code>而不是<code v-pre>wallet</code>，不然则不能更改<code v-pre>staticCall</code>方法中的<code v-pre>from</code>（可能是bug，也可能是feature）。</p>
				<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js">
					<pre v-pre><code><span class="line"><span class="token comment">// DAI的ABI</span></span>
<span class="line"><span class="token keyword">const</span> abiDAI <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">"function balanceOf(address) public view returns(uint)"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">"function transfer(address, uint) public returns (bool)"</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// DAI合约地址（主网）</span></span>
<span class="line"><span class="token keyword">const</span> addressDAI <span class="token operator">=</span> <span class="token string">'0x6B175474E89094C44Da98b954EedeAC495271d0F'</span> <span class="token comment">// DAI Contract</span></span>
<span class="line"><span class="token comment">// 创建DAI合约实例</span></span>
<span class="line"><span class="token keyword">const</span> contractDAI <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>Contract</span><span class="token punctuation">(</span>addressDAI<span class="token punctuation">,</span> abiDAI<span class="token punctuation">,</span> provider<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
					<div class="line-numbers" aria-hidden="true" style="counter-reset: line-number 0">
						<div class="line-number"></div>
						<div class="line-number"></div>
						<div class="line-number"></div>
						<div class="line-number"></div>
						<div class="line-number"></div>
						<div class="line-number"></div>
						<div class="line-number"></div>
						<div class="line-number"></div>
						<div class="line-number"></div>
					</div>
				</div>
			</li>
			<li>
				<p>查看钱包中<code v-pre>DAI</code>余额，为0。</p>
				<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js">
					<pre v-pre><code><span class="line"><span class="token keyword">const</span> address <span class="token operator">=</span> <span class="token keyword">await</span> wallet<span class="token punctuation">.</span><span class="token function">getAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"\n1. 读取测试钱包的DAI余额"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">const</span> balanceDAI <span class="token operator">=</span> <span class="token keyword">await</span> contractDAI<span class="token punctuation">.</span><span class="token function">balanceOf</span><span class="token punctuation">(</span>address<span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">DAI持仓: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>ethers<span class="token punctuation">.</span><span class="token function">formatEther</span><span class="token punctuation">(</span>balanceDAI<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\n</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
					<div class="line-numbers" aria-hidden="true" style="counter-reset: line-number 0">
						<div class="line-number"></div>
						<div class="line-number"></div>
						<div class="line-number"></div>
						<div class="line-number"></div>
					</div>
				</div>
				<p><img src="@source/ethers/img/11-2.png" alt="钱包DAI余额" /></p>
			</li>
			<li>
				<p>用<code v-pre>staticCall</code>调用<code v-pre>transfer()</code>函数，将<code v-pre>from</code>参数填为Vitalik地址，模拟Vitalik转账<code v-pre>10000 DAI</code>。这笔交易将成功，因为Vitalik钱包有充足的<code v-pre>DAI</code>。</p>
				<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js">
					<pre v-pre><code><span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"\n2.  用staticCall尝试调用transfer转账1 DAI，msg.sender为Vitalik地址"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 发起交易</span></span>
<span class="line"><span class="token keyword">const</span> tx <span class="token operator">=</span> <span class="token keyword">await</span> contractDAI<span class="token punctuation">.</span>transfer<span class="token punctuation">.</span><span class="token function">staticCall</span><span class="token punctuation">(</span><span class="token string">"vitalik.eth"</span><span class="token punctuation">,</span> ethers<span class="token punctuation">.</span><span class="token function">parseEther</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">from</span><span class="token operator">:</span>  <span class="token keyword">await</span> provider<span class="token punctuation">.</span><span class="token function">resolveName</span><span class="token punctuation">(</span><span class="token string">"vitalik.eth"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">交易会成功吗？：</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> tx<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
					<div class="line-numbers" aria-hidden="true" style="counter-reset: line-number 0">
						<div class="line-number"></div>
						<div class="line-number"></div>
						<div class="line-number"></div>
						<div class="line-number"></div>
					</div>
				</div>
				<p><img src="@source/ethers/img/11-3.png" alt="模拟Vitalik转账" /></p>
			</li>
			<li>
				<p>用<code v-pre>staticCall</code>调用<code v-pre>transfer()</code>函数，将<code v-pre>from</code>参数填为测试钱包地址，模拟转账<code v-pre>10000 DAI</code>。这笔交易将失败，报错，并返回原因<code v-pre>Dai/insufficient-balance</code>。</p>
				<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js">
					<pre v-pre><code><span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"\n3.  用staticCall尝试调用transfer转账10000 DAI，msg.sender为测试钱包地址"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">const</span> tx2 <span class="token operator">=</span> <span class="token keyword">await</span> contractDAI<span class="token punctuation">.</span>transfer<span class="token punctuation">.</span><span class="token function">staticCall</span><span class="token punctuation">(</span><span class="token string">"vitalik.eth"</span><span class="token punctuation">,</span> ethers<span class="token punctuation">.</span><span class="token function">parseEther</span><span class="token punctuation">(</span><span class="token string">"10000"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">from</span><span class="token operator">:</span> address<span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">交易会成功吗？：</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> tx2<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
					<div class="line-numbers" aria-hidden="true" style="counter-reset: line-number 0">
						<div class="line-number"></div>
						<div class="line-number"></div>
						<div class="line-number"></div>
					</div>
				</div>
				<p><img src="@source/ethers/img/11-4.png" alt="模拟测试钱包转账" /></p>
			</li>
		</ol>
		<h2 id="完整代码" tabindex="-1">
			<a class="header-anchor" href="#完整代码"><span>完整代码</span></a>
		</h2>
		<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js">
			<pre v-pre><code><span class="line"><span class="token comment">// contract.函数名.staticCall(参数, {override})</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ethers <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ethers"</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"></span></span>
<span class="line"><span class="token keyword">const</span> <span class="token constant">ALCHEMY_MAINNET_URL</span> <span class="token operator">=</span> <span class="token string">'https://eth-mainnet.g.alchemy.com/v2/oKmOQKbneVkxgHZfibs-iFhIlIAl6HDN'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> provider <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>JsonRpcProvider</span><span class="token punctuation">(</span><span class="token constant">ALCHEMY_MAINNET_URL</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 利用私钥和provider创建wallet对象</span></span>
<span class="line"><span class="token keyword">const</span> privateKey <span class="token operator">=</span> <span class="token string">'0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2b'</span></span>
<span class="line"><span class="token keyword">const</span> wallet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>Wallet</span><span class="token punctuation">(</span>privateKey<span class="token punctuation">,</span> provider<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// DAI的ABI</span></span>
<span class="line"><span class="token keyword">const</span> abiDAI <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">"function balanceOf(address) public view returns(uint)"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">"function transfer(address, uint) public returns (bool)"</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// DAI合约地址（主网）</span></span>
<span class="line"><span class="token keyword">const</span> addressDAI <span class="token operator">=</span> <span class="token string">'0x6B175474E89094C44Da98b954EedeAC495271d0F'</span> <span class="token comment">// DAI Contract</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 创建DAI合约实例</span></span>
<span class="line"><span class="token keyword">const</span> contractDAI <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>Contract</span><span class="token punctuation">(</span>addressDAI<span class="token punctuation">,</span> abiDAI<span class="token punctuation">,</span> provider<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">main</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> address <span class="token operator">=</span> <span class="token keyword">await</span> wallet<span class="token punctuation">.</span><span class="token function">getAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">// 1. 读取DAI合约的链上信息</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"\n1. 读取测试钱包的DAI余额"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">const</span> balanceDAI <span class="token operator">=</span> <span class="token keyword">await</span> contractDAI<span class="token punctuation">.</span><span class="token function">balanceOf</span><span class="token punctuation">(</span>address<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">const</span> balanceDAIVitalik <span class="token operator">=</span> <span class="token keyword">await</span> contractDAI<span class="token punctuation">.</span><span class="token function">balanceOf</span><span class="token punctuation">(</span><span class="token string">"vitalik.eth"</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">测试钱包 DAI持仓: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>ethers<span class="token punctuation">.</span><span class="token function">formatEther</span><span class="token punctuation">(</span>balanceDAI<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\n</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">vitalik DAI持仓: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>ethers<span class="token punctuation">.</span><span class="token function">formatEther</span><span class="token punctuation">(</span>balanceDAIVitalik<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\n</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 2. 用staticCall尝试调用transfer转账1 DAI，msg.sender为Vitalik，交易将成功</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"\n2.  用staticCall尝试调用transfer转账1 DAI，msg.sender为Vitalik地址"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">// 发起交易</span></span>
<span class="line">    <span class="token keyword">const</span> tx <span class="token operator">=</span> <span class="token keyword">await</span> contractDAI<span class="token punctuation">.</span>transfer<span class="token punctuation">.</span><span class="token function">staticCall</span><span class="token punctuation">(</span><span class="token string">"vitalik.eth"</span><span class="token punctuation">,</span> ethers<span class="token punctuation">.</span><span class="token function">parseEther</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">from</span><span class="token operator">:</span> <span class="token keyword">await</span> provider<span class="token punctuation">.</span><span class="token function">resolveName</span><span class="token punctuation">(</span><span class="token string">"vitalik.eth"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">交易会成功吗？：</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> tx<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 3. 用staticCall尝试调用transfer转账10000 DAI，msg.sender为测试钱包地址，交易将失败</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"\n3.  用staticCall尝试调用transfer转账1 DAI，msg.sender为测试钱包地址"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">const</span> tx2 <span class="token operator">=</span> <span class="token keyword">await</span> contractDAI<span class="token punctuation">.</span>transfer<span class="token punctuation">.</span><span class="token function">staticCall</span><span class="token punctuation">(</span><span class="token string">"vitalik.eth"</span><span class="token punctuation">,</span> ethers<span class="token punctuation">.</span><span class="token function">parseEther</span><span class="token punctuation">(</span><span class="token string">"10000"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">from</span><span class="token operator">:</span> address<span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">交易会成功吗？：</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> tx2<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
			<div class="line-numbers" aria-hidden="true" style="counter-reset: line-number 0">
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
				<div class="line-number"></div>
			</div>
		</div>
	</div>
</template>
