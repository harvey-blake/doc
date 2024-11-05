"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[722],{330:(s,n,a)=>{a.r(n),a.d(n,{comp:()=>i,data:()=>l});var e=a(641);const p={},i=(0,a(262).A)(p,[["render",function(s,n){return(0,e.uX)(),(0,e.CE)("div",null,n[0]||(n[0]=[(0,e.Fv)('<h1 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h1><h2 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件"><span>配置文件</span></a></h2><p>VuePress 站点的基本配置文件是 <code>.vuepress/config.js</code> ，但也同样支持 TypeScript 配置文件。你可以使用 <code>.vuepress/config.ts</code> 来得到更好的类型提示。</p><p>具体而言，我们对于配置文件的路径有着约定（按照优先顺序）：</p><ul><li>当前工作目录 <code>cwd</code> 下： <ul><li><code>vuepress.config.ts</code></li><li><code>vuepress.config.js</code></li><li><code>vuepress.config.mjs</code></li></ul></li><li>源文件目录 <code>sourceDir</code> 下： <ul><li><code>.vuepress/config.ts</code></li><li><code>.vuepress/config.js</code></li><li><code>.vuepress/config.mjs</code></li></ul></li></ul><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">vuepress dev docs <span class="token parameter variable">--config</span> my-config.ts</span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>一个基础的配置文件是这样的：</p><div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> viteBundler <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vuepress/bundler-vite&#39;</span></span>\n<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> defaultTheme <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vuepress/theme-default&#39;</span></span>\n<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> defineUserConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuepress&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineUserConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>\n<span class="line">  bundler<span class="token operator">:</span> <span class="token function">viteBundler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>\n<span class="line">  theme<span class="token operator">:</span> <span class="token function">defaultTheme</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>\n<span class="line"></span>\n<span class="line">  lang<span class="token operator">:</span> <span class="token string">&#39;zh-CN&#39;</span><span class="token punctuation">,</span></span>\n<span class="line">  title<span class="token operator">:</span> <span class="token string">&#39;你好， VuePress ！&#39;</span><span class="token punctuation">,</span></span>\n<span class="line">  description<span class="token operator">:</span> <span class="token string">&#39;这是我的第一个 VuePress 站点&#39;</span><span class="token punctuation">,</span></span>\n<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="客户端配置文件" tabindex="-1"><a class="header-anchor" href="#客户端配置文件"><span>客户端配置文件</span></a></h2><p>在大多数情况下，配置文件已经足够帮助你配置好你的 VuePress 站点。不过，有些时候用户们可能希望直接添加一些客户端代码。 VuePress 通过客户端配置文件来支持这种需求：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">├─ docs</span>\n<span class="line">│  ├─ .vuepress</span>\n<span class="line">│  │  ├─ client.js   &lt;--- 客户端配置文件</span>\n<span class="line">│  │  └─ config.js   &lt;--- 配置文件</span>\n<span class="line">│  └─ README.md</span>\n<span class="line">├─ .gitignore</span>\n<span class="line">└─ package.json</span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样的，我们也有关于客户端配置文件的路径约定（按照优先顺序）：</p><ul><li>当前工作目录 <code>cwd</code> 下： <ul><li><code>vuepress.client.ts</code></li><li><code>vuepress.client.js</code></li><li><code>vuepress.client.mjs</code></li></ul></li><li>源文件目录 <code>sourceDir</code> 下： <ul><li><code>.vuepress/client.ts</code></li><li><code>.vuepress/client.js</code></li><li><code>.vuepress/client.mjs</code></li></ul></li></ul><p>一个基础的客户端配置文件是这样的：</p><div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> defineClientConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuepress/client&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineClientConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>\n<span class="line">  <span class="token function">enhance</span><span class="token punctuation">(</span><span class="token punctuation">{</span> app<span class="token punctuation">,</span> router<span class="token punctuation">,</span> siteData <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>\n<span class="line">  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>\n<span class="line">  rootComponents<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>\n<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>和配置文件不同，客户端配置文件不能通过命令行接口的选项来指定。</p></div>',16)]))}]]),l=JSON.parse('{"path":"/VuePress/configuration.html","title":"配置","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"配置文件","slug":"配置文件","link":"#配置文件","children":[]},{"level":2,"title":"客户端配置文件","slug":"客户端配置文件","link":"#客户端配置文件","children":[]}],"git":{"updatedTime":1730769527000},"filePathRelative":"VuePress/configuration.md"}')}}]);