<template><div><h1 id="api返回值" tabindex="-1"><a class="header-anchor" href="#api返回值" aria-hidden="true">#</a> API返回值</h1>
<p>当前API返回的状态码（http_status_code）有两种<code v-pre>200</code>和<code v-pre>400</code></p>
<h2 id="返回400" tabindex="-1"><a class="header-anchor" href="#返回400" aria-hidden="true">#</a> 返回400</h2>
<p>如果API返回了400，表明请求参数未通过验证，此时返回格式有两种</p>
<p>1，有具体的参数错误，多为参数校验失败</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"energy_amount"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"请确保该值大于或者等于 10000。"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> 
    <span class="token property">"period"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"'1X' 不是合法选项。"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<ul>
<li>将列出每个字段的错误原因，原因列表为数组，可能存在多个原因！</li>
</ul>
</div>
<p>2，无具体的参数错误，多为参数校验成功，但是引起了其他错误</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span><span class="token property">"detail"</span><span class="token operator">:</span> <span class="token string">"API not found"</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<ul>
<li>key固定为detail，并且返回结果为字符串，开发时如果要显示具体错误，需要先判断是不是为detil类型错误，再判断是否参数错误</li>
</ul>
</div>
<h2 id="返回200" tabindex="-1"><a class="header-anchor" href="#返回200" aria-hidden="true">#</a> 返回200</h2>
<p>当API返回200时，返回格式固定为</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"errno"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">"message"</span><span class="token operator">:</span> 'XXXX'<span class="token punctuation">,</span>
    <span class="token property">"param1"</span><span class="token operator">:</span> <span class="token string">"value1"</span><span class="token punctuation">,</span>
    ...
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>errno为1或者0，当<code v-pre>errno=0</code>时表明请求正常， <code v-pre>errno=1</code>时表明请求遇到了问题，此时会有<code v-pre>message</code>参数表明原因</li>
<li>部分请求中，会有其他的返回参数，具体以API章节的说明为准</li>
</ul>
</div></template>


