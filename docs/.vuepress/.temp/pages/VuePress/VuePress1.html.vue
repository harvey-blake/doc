<template><div><h1 id="markdown基本语法" tabindex="-1"><a class="header-anchor" href="#markdown基本语法"><span>Markdown基本语法</span></a></h1>
<h2 id="提示" tabindex="-1"><a class="header-anchor" href="#提示"><span>提示</span></a></h2>
<div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre v-pre><code><span class="line">::: tip 提示</span>
<span class="line"><span class="token list punctuation">-</span> 提示信息</span>
<span class="line">:::</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">提示</p>
<ul>
<li>提示信息</li>
</ul>
</div>
<h2 id="警告" tabindex="-1"><a class="header-anchor" href="#警告"><span>警告</span></a></h2>
<div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre v-pre><code><span class="line">::: warning 警告</span>
<span class="line">请注意，使用过时的依赖可能会导致意外错误。</span>
<span class="line">:::</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning">
<p class="hint-container-title">警告</p>
<p>请注意，使用过时的依赖可能会导致意外错误。</p>
</div>
<h2 id="危险" tabindex="-1"><a class="header-anchor" href="#危险"><span>危险</span></a></h2>
<div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre v-pre><code><span class="line">::: danger 危险</span>
<span class="line">在进行生产环境的更改前，请确保备份数据。</span>
<span class="line">:::</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container caution">
<p class="hint-container-title">危险</p>
<p>在进行生产环境的更改前，请确保备份数据。</p>
</div>
<h2 id="代码示例" tabindex="-1"><a class="header-anchor" href="#代码示例"><span>代码示例</span></a></h2>
<div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre v-pre><code><span class="line">```javascript</span>
<span class="line">console.log("这是一个代码示例");</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">```javascript</span>
<span class="line">console.log("这是一个代码示例");</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="引用" tabindex="-1"><a class="header-anchor" href="#引用"><span>引用</span></a></h2>
<div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre v-pre><code><span class="line"><span class="token blockquote punctuation">></span> 这是一个引用，用于突出重要信息。</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><blockquote>
<p>这是一个引用，用于突出重要信息。</p>
</blockquote>
<h2 id="列表" tabindex="-1"><a class="header-anchor" href="#列表"><span>列表</span></a></h2>
<div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre v-pre><code><span class="line"><span class="token list punctuation">-</span> 项目一</span>
<span class="line"><span class="token list punctuation">-</span> 项目二</span>
<span class="line"><span class="token list punctuation">-</span> 项目三</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>项目一</li>
<li>项目二</li>
<li>项目三</li>
</ul>
<h2 id="有序列表" tabindex="-1"><a class="header-anchor" href="#有序列表"><span>有序列表</span></a></h2>
<div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre v-pre><code><span class="line"><span class="token list punctuation">1.</span> 第一项</span>
<span class="line"><span class="token list punctuation">2.</span> 第二项</span>
<span class="line"><span class="token list punctuation">3.</span> 第三项</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>第一项</li>
<li>第二项</li>
<li>第三项</li>
</ol>
<h2 id="图片和链接" tabindex="-1"><a class="header-anchor" href="#图片和链接"><span>图片和链接</span></a></h2>
<div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre v-pre><code><span class="line"><span class="token url"><span class="token operator">!</span>[<span class="token content">VuePress Logo</span>](<span class="token url">https://vuepress.vuejs.org/hero.png</span>)</span></span>
<span class="line"></span>
<span class="line"><span class="token url">[<span class="token content">访问 VuePress 官网</span>](<span class="token url">https://vuepress.vuejs.org</span>)</span></span>
<span class="line"></span>
<span class="line">[routing][]链接</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token url-reference url"><span class="token punctuation">[</span><span class="token variable">routing</span><span class="token punctuation">]</span><span class="token punctuation">:</span> https://vuejs.press/guide/page.html#routing</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://vuepress.vuejs.org/hero.png" alt="VuePress Logo"></p>
<p><a href="https://vuepress.vuejs.org" target="_blank" rel="noopener noreferrer">访问 VuePress 官网</a></p>
<p><a href="https://vuejs.press/guide/page.html#routing" target="_blank" rel="noopener noreferrer">routing</a>链接</p>
<h2 id="强调文本" tabindex="-1"><a class="header-anchor" href="#强调文本"><span>强调文本</span></a></h2>
<div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre v-pre><code><span class="line"><span class="token bold"><span class="token punctuation">**</span><span class="token content">这是加粗文本</span><span class="token punctuation">**</span></span></span>
<span class="line"><span class="token italic"><span class="token punctuation">*</span><span class="token content">这是斜体文本</span><span class="token punctuation">*</span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这是加粗文本</strong>
<em>这是斜体文本</em></p>
<h2 id="表格" tabindex="-1"><a class="header-anchor" href="#表格"><span>表格</span></a></h2>
<div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre v-pre><code><span class="line"><span class="token table"><span class="token table-header-row"><span class="token punctuation">|</span><span class="token table-header important"> 列1 </span><span class="token punctuation">|</span><span class="token table-header important"> 列2 </span><span class="token punctuation">|</span><span class="token table-header important"> 列3 </span><span class="token punctuation">|</span></span>
<span class="line"></span><span class="token table-line"><span class="token punctuation">|</span><span class="token punctuation">-----</span><span class="token punctuation">|</span><span class="token punctuation">-----</span><span class="token punctuation">|</span><span class="token punctuation">-----</span><span class="token punctuation">|</span></span>
<span class="line"></span><span class="token table-data-rows"><span class="token punctuation">|</span><span class="token table-data"> 数据1 </span><span class="token punctuation">|</span><span class="token table-data"> 数据2 </span><span class="token punctuation">|</span><span class="token table-data"> 数据3 </span><span class="token punctuation">|</span></span>
<span class="line"><span class="token punctuation">|</span><span class="token table-data"> 数据4 </span><span class="token punctuation">|</span><span class="token table-data"> 数据5 </span><span class="token punctuation">|</span><span class="token table-data"> 数据6 </span><span class="token punctuation">|</span></span>
<span class="line"></span></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table>
<thead>
<tr>
<th>列1</th>
<th>列2</th>
<th>列3</th>
</tr>
</thead>
<tbody>
<tr>
<td>数据1</td>
<td>数据2</td>
<td>数据3</td>
</tr>
<tr>
<td>数据4</td>
<td>数据5</td>
<td>数据6</td>
</tr>
</tbody>
</table>
<h2 id="任务列表" tabindex="-1"><a class="header-anchor" href="#任务列表"><span>任务列表</span></a></h2>
<div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre v-pre><code><span class="line"><span class="token list punctuation">-</span> [x] 任务已完成</span>
<span class="line"><span class="token list punctuation">-</span> [ ] 任务未完成</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>[x] 任务已完成</li>
<li>[ ] 任务未完成</li>
</ul>
<h2 id="备注" tabindex="-1"><a class="header-anchor" href="#备注"><span>备注</span></a></h2>
<div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre v-pre><code><span class="line">::: details 更多信息</span>
<span class="line">这是可以折叠的内容。</span>
<span class="line">:::</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="hint-container details"><summary>更多信息</summary>
<p>这是可以折叠的内容。</p>
</details>
<h2 id="标题的代码块" tabindex="-1"><a class="header-anchor" href="#标题的代码块"><span>标题的代码块</span></a></h2>
<div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre v-pre><code><span class="line">```text  title="Inheritance.text"</span>
<span class="line">带标题的代码块</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="Inheritance.text"><pre v-pre><code><span class="line">带标题的代码块</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


