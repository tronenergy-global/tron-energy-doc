<template><div><h1 id="智能委托" tabindex="-1"><a class="header-anchor" href="#智能委托" aria-hidden="true">#</a> 智能委托</h1>
<h2 id="接口地址" tabindex="-1"><a class="header-anchor" href="#接口地址" aria-hidden="true">#</a> 接口地址</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>POST /api/v1/frontend/auto-delegate-policy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="请求参数" tabindex="-1"><a class="header-anchor" href="#请求参数" aria-hidden="true">#</a> 请求参数</h2>
<table>
<thead>
<tr>
<th>参数名称</th>
<th>类型</th>
<th>必填</th>
<th>说明</th>
<th>示例</th>
</tr>
</thead>
<tbody>
<tr>
<td>period</td>
<td>int</td>
<td>是</td>
<td>委托周期， 1-30</td>
<td>10</td>
</tr>
<tr>
<td>receive_address</td>
<td>Tron地址</td>
<td>是</td>
<td>地址需要是已激活的，否则下单失败</td>
<td></td>
</tr>
<tr>
<td>max_energy</td>
<td>int</td>
<td>否</td>
<td>保持的可用量</td>
<td>65000</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<ul>
<li>max_energy示例，假设设置为65000，现在转账一笔消耗32000，会立即补充32000，使得当前可用为65000</li>
</ul>
</div>
<h2 id="返回参数" tabindex="-1"><a class="header-anchor" href="#返回参数" aria-hidden="true">#</a> 返回参数</h2>
<ul>
<li>正常返回示例</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"errno"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"已添加1条智能委托"</span><span class="token punctuation">,</span>
    <span class="token property">"balance"</span><span class="token operator">:</span> <span class="token number">813900029257</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>异常返回请参考<RouterLink to="/zh/general/error-code.html">API返回值</RouterLink></p>
</li>
<li>
<p>字段解释</p>
</li>
</ul>
<table>
<thead>
<tr>
<th>参数名称</th>
<th>类型</th>
<th>说明</th>
<th>示例</th>
</tr>
</thead>
<tbody>
<tr>
<td>errno</td>
<td>int</td>
<td>错误码，为0时正常</td>
<td></td>
</tr>
<tr>
<td>message</td>
<td>string</td>
<td>错误原因，errno &gt; 0 时有</td>
<td></td>
</tr>
<tr>
<td>balance</td>
<td>int</td>
<td>余额，单位sun，转成TRX需要除以1000000</td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="代码示例" tabindex="-1"><a class="header-anchor" href="#代码示例" aria-hidden="true">#</a> 代码示例</h2>
<CodeGroup>
  <CodeGroupItem title="Python" active>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">import</span> hmac
<span class="token keyword">import</span> json
<span class="token keyword">import</span> requests
<span class="token keyword">import</span> hashlib
<span class="token keyword">import</span> time


API_KEY <span class="token operator">=</span> <span class="token string">"B433BFF1CDE7450AA38A56BEAC690DD4"</span>
API_SECRET <span class="token operator">=</span> <span class="token string">"0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8"</span>

timestamp <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
URL <span class="token operator">=</span> <span class="token string">"https://{domain}/api/v1/frontend/auto-delegate-policy"</span>
data <span class="token operator">=</span> <span class="token punctuation">{</span>
   <span class="token string">'receive_address'</span><span class="token punctuation">:</span> <span class="token string">'TEX5nLeFJ1dyazhJC3P9eYJs7hxgk7knJY'</span><span class="token punctuation">,</span>   
   <span class="token string">'period'</span><span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">,</span>      <span class="token comment"># 天数1-30</span>
   <span class="token string">'max_energy'</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token comment"># 保持能量上限，0为自动</span>
<span class="token punctuation">}</span>
json_data <span class="token operator">=</span> json<span class="token punctuation">.</span>dumps<span class="token punctuation">(</span>data<span class="token punctuation">,</span> sort_keys<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> separators<span class="token operator">=</span><span class="token punctuation">(</span><span class="token string">','</span><span class="token punctuation">,</span> <span class="token string">':'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
message <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f'</span><span class="token interpolation"><span class="token punctuation">{</span>timestamp<span class="token punctuation">}</span></span><span class="token string">&amp;</span><span class="token interpolation"><span class="token punctuation">{</span>json_data<span class="token punctuation">}</span></span><span class="token string">'</span></span>
signature <span class="token operator">=</span> hmac<span class="token punctuation">.</span>new<span class="token punctuation">(</span>API_SECRET<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> message<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> hashlib<span class="token punctuation">.</span>sha256<span class="token punctuation">)</span><span class="token punctuation">.</span>hexdigest<span class="token punctuation">(</span><span class="token punctuation">)</span>


headers <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">"API-KEY"</span><span class="token punctuation">:</span> API_KEY<span class="token punctuation">,</span>
    <span class="token string">"TIMESTAMP"</span><span class="token punctuation">:</span> timestamp<span class="token punctuation">,</span>
    <span class="token string">"SIGNATURE"</span><span class="token punctuation">:</span> signature<span class="token punctuation">,</span>
    <span class="token string">'Content-Type'</span><span class="token punctuation">:</span> <span class="token string">'application/json'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

response <span class="token operator">=</span> requests<span class="token punctuation">.</span>post<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>URL<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">,</span> data<span class="token operator">=</span>json_data<span class="token punctuation">,</span> headers<span class="token operator">=</span>headers<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>




</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="Php">
<div class="language-php line-numbers-mode" data-ext="php"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token variable">$API_KEY</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"B433BFF1CDE7450AA38A56BEAC690DD4"</span><span class="token punctuation">;</span>
<span class="token variable">$API_SECRET</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8"</span><span class="token punctuation">;</span>

<span class="token variable">$timestamp</span> <span class="token operator">=</span> <span class="token function">time</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$data</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string single-quoted-string">'max_energy'</span> <span class="token operator">=></span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string single-quoted-string">'period'</span> <span class="token operator">=></span> <span class="token number">5</span><span class="token punctuation">,</span>
    <span class="token string single-quoted-string">'receive_address'</span> <span class="token operator">=></span> <span class="token string single-quoted-string">'TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw'</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token function">ksort</span><span class="token punctuation">(</span><span class="token variable">$data</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$json_data</span> <span class="token operator">=</span> <span class="token function">json_encode</span><span class="token punctuation">(</span><span class="token variable">$data</span><span class="token punctuation">,</span> <span class="token constant">JSON_UNESCAPED_SLASHES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$message</span> <span class="token operator">=</span> <span class="token variable">$timestamp</span> <span class="token operator">.</span> <span class="token string single-quoted-string">'&amp;'</span> <span class="token operator">.</span> <span class="token variable">$json_data</span><span class="token punctuation">;</span>

<span class="token variable">$signature</span> <span class="token operator">=</span> <span class="token function">hash_hmac</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'sha256'</span><span class="token punctuation">,</span> <span class="token variable">$message</span><span class="token punctuation">,</span> <span class="token variable">$API_SECRET</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$options</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string single-quoted-string">'http'</span> <span class="token operator">=></span> <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">'header'</span>  <span class="token operator">=></span> <span class="token string double-quoted-string">"Content-Type: application/json\r\n"</span> <span class="token operator">.</span>
                     <span class="token string double-quoted-string">"API-KEY: <span class="token interpolation"><span class="token variable">$API_KEY</span></span>\r\n"</span> <span class="token operator">.</span>
                     <span class="token string double-quoted-string">"TIMESTAMP: <span class="token interpolation"><span class="token variable">$timestamp</span></span>\r\n"</span> <span class="token operator">.</span>
                     <span class="token string double-quoted-string">"SIGNATURE: <span class="token interpolation"><span class="token variable">$signature</span></span>\r\n"</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">'method'</span>  <span class="token operator">=></span> <span class="token string single-quoted-string">'POST'</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">'content'</span> <span class="token operator">=></span> <span class="token variable">$json_data</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token variable">$context</span>  <span class="token operator">=</span> <span class="token function">stream_context_create</span><span class="token punctuation">(</span><span class="token variable">$options</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$result</span> <span class="token operator">=</span> <span class="token function">file_get_contents</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"https://{domain}/api/v1/frontend/auto-delegate-policy"</span><span class="token punctuation">,</span> <span class="token constant boolean">false</span><span class="token punctuation">,</span> <span class="token variable">$context</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token variable">$result</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token delimiter important">?></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="Java">
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>google<span class="token punctuation">.</span>gson<span class="token punctuation">.</span></span><span class="token class-name">Gson</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>google<span class="token punctuation">.</span>gson<span class="token punctuation">.</span></span><span class="token class-name">GsonBuilder</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">okhttp3<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>crypto<span class="token punctuation">.</span></span><span class="token class-name">Mac</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>crypto<span class="token punctuation">.</span>spec<span class="token punctuation">.</span></span><span class="token class-name">SecretKeySpec</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>nio<span class="token punctuation">.</span>charset<span class="token punctuation">.</span></span><span class="token class-name">StandardCharsets</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>security<span class="token punctuation">.</span></span><span class="token class-name">MessageDigest</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span><span class="token class-name">Instant</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">HashMap</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Map</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">TreeMap</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">API_KEY</span> <span class="token operator">=</span> <span class="token string">"B433BFF1CDE7450AA38A56BEAC690DD4"</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">API_SECRET</span> <span class="token operator">=</span> <span class="token string">"0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8"</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">OkHttpClient</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OkHttpClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">MediaType</span> mediaType <span class="token operator">=</span> <span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">"application/json"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> timestamp <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getEpochSecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        data<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"max_energy"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        data<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"period"</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        data<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"receive_address"</span><span class="token punctuation">,</span> <span class="token string">"TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">// Sorting the keys</span>
        <span class="token class-name">TreeMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> sortedData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Gson</span> gson <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GsonBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">disableHtmlEscaping</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> json_data <span class="token operator">=</span> gson<span class="token punctuation">.</span><span class="token function">toJson</span><span class="token punctuation">(</span>sortedData<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">String</span> message <span class="token operator">=</span> timestamp <span class="token operator">+</span> <span class="token string">"&amp;"</span> <span class="token operator">+</span> json_data<span class="token punctuation">;</span>
        <span class="token class-name">String</span> signature <span class="token operator">=</span> <span class="token function">encodeHmacSHA256</span><span class="token punctuation">(</span>message<span class="token punctuation">,</span> <span class="token constant">API_SECRET</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">RequestBody</span> body <span class="token operator">=</span> <span class="token class-name">RequestBody</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>json_data<span class="token punctuation">,</span> mediaType<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Request</span> request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Request<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">url</span><span class="token punctuation">(</span><span class="token string">"https://{domain}/api/v1/frontend/auto-delegate-policy"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">method</span><span class="token punctuation">(</span><span class="token string">"POST"</span><span class="token punctuation">,</span> body<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">addHeader</span><span class="token punctuation">(</span><span class="token string">"API-KEY"</span><span class="token punctuation">,</span> <span class="token constant">API_KEY</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">addHeader</span><span class="token punctuation">(</span><span class="token string">"TIMESTAMP"</span><span class="token punctuation">,</span> timestamp<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">addHeader</span><span class="token punctuation">(</span><span class="token string">"SIGNATURE"</span><span class="token punctuation">,</span> signature<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">addHeader</span><span class="token punctuation">(</span><span class="token string">"Content-Type"</span><span class="token punctuation">,</span> <span class="token string">"application/json"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Response</span> response <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">newCall</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">encodeHmacSHA256</span><span class="token punctuation">(</span><span class="token class-name">String</span> data<span class="token punctuation">,</span> <span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">Mac</span> sha256_HMAC <span class="token operator">=</span> <span class="token class-name">Mac</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token string">"HmacSHA256"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">SecretKeySpec</span> secret_key <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SecretKeySpec</span><span class="token punctuation">(</span>key<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"HmacSHA256"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sha256_HMAC<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>secret_key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> sha256_HMAC<span class="token punctuation">.</span><span class="token function">doFinal</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">StringBuilder</span> hash <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">byte</span> b <span class="token operator">:</span> bytes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> hex <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">toHexString</span><span class="token punctuation">(</span><span class="token number">0xff</span> <span class="token operator">&amp;</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>hex<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> hash<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token char">'0'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            hash<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>hex<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> hash<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="Go">
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"crypto/hmac"</span>
	<span class="token string">"crypto/sha256"</span>
	<span class="token string">"encoding/hex"</span>
	<span class="token string">"encoding/json"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io/ioutil"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"strconv"</span>
	<span class="token string">"time"</span>

	jsoniter <span class="token string">"github.com/json-iterator/go"</span>
<span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token punctuation">(</span>
	APIKey    <span class="token operator">=</span> <span class="token string">"B433BFF1CDE7450AA38A56BEAC690DD4"</span>
	APISecret <span class="token operator">=</span> <span class="token string">"0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8"</span>
	URL       <span class="token operator">=</span> <span class="token string">"https://{domain}/api/v1/frontend/auto-delegate-policy"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Data <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	MaxEnergy   <span class="token builtin">int</span>    <span class="token string">`json:"max_energy"`</span>
	Period         <span class="token builtin">int</span> <span class="token string">`json:"period"`</span>
	ReceiveAddress <span class="token builtin">string</span> <span class="token string">`json:"receive_address"`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	timestamp <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">FormatInt</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Unix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>

	data <span class="token operator">:=</span> Data<span class="token punctuation">{</span>
		MaxEnergy<span class="token punctuation">:</span>   <span class="token number">0</span><span class="token punctuation">,</span>
		Period<span class="token punctuation">:</span>         <span class="token number">5</span><span class="token punctuation">,</span>
		ReceiveAddress<span class="token punctuation">:</span> <span class="token string">"TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw"</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

  ordered_data <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span>
		<span class="token string">"max_energy"</span><span class="token punctuation">:</span>       data<span class="token punctuation">.</span>MaxEnergy<span class="token punctuation">,</span>
		<span class="token string">"period"</span><span class="token punctuation">:</span>           data<span class="token punctuation">.</span>Period<span class="token punctuation">,</span>
		<span class="token string">"receive_address"</span><span class="token punctuation">:</span>  data<span class="token punctuation">.</span>ReceiveAddress<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	json <span class="token operator">:=</span> jsoniter<span class="token punctuation">.</span>ConfigCompatibleWithStandardLibrary
	b<span class="token punctuation">,</span> err <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>ordered_data<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	json_data <span class="token operator">:=</span> <span class="token function">string</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>

	message <span class="token operator">:=</span> timestamp <span class="token operator">+</span> <span class="token string">"&amp;"</span> <span class="token operator">+</span> json_data
	signature <span class="token operator">:=</span> <span class="token function">createHmac</span><span class="token punctuation">(</span>message<span class="token punctuation">,</span> APISecret<span class="token punctuation">)</span>

	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span><span class="token punctuation">}</span>
	req<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequest</span><span class="token punctuation">(</span><span class="token string">"POST"</span><span class="token punctuation">,</span> URL<span class="token punctuation">,</span> bytes<span class="token punctuation">.</span><span class="token function">NewBuffer</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>json_data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"API-KEY"</span><span class="token punctuation">,</span> APIKey<span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"TIMESTAMP"</span><span class="token punctuation">,</span> timestamp<span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"SIGNATURE"</span><span class="token punctuation">,</span> signature<span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"Content-Type"</span><span class="token punctuation">,</span> <span class="token string">"application/json"</span><span class="token punctuation">)</span>

	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	respBody<span class="token punctuation">,</span> err <span class="token operator">:=</span> ioutil<span class="token punctuation">.</span><span class="token function">ReadAll</span><span class="token punctuation">(</span>resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>respBody<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">createHmac</span><span class="token punctuation">(</span>message <span class="token builtin">string</span><span class="token punctuation">,</span> secret <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	h <span class="token operator">:=</span> hmac<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span>sha256<span class="token punctuation">.</span>New<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>secret<span class="token punctuation">)</span><span class="token punctuation">)</span>
	h<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> hex<span class="token punctuation">.</span><span class="token function">EncodeToString</span><span class="token punctuation">(</span>h<span class="token punctuation">.</span><span class="token function">Sum</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="Shell">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token assign-left variable">API_KEY</span><span class="token operator">=</span><span class="token string">"B433BFF1CDE7450AA38A56BEAC690DD4"</span>
<span class="token assign-left variable">API_SECRET</span><span class="token operator">=</span><span class="token string">"0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8"</span>
<span class="token assign-left variable">URL</span><span class="token operator">=</span><span class="token string">"https://{domain}/api/v1/frontend/auto-delegate-policy"</span>

<span class="token assign-left variable">timestamp</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%s<span class="token variable">)</span></span>

<span class="token assign-left variable">data</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> <span class="token string">'{
   "max_energy": 0,
   "period": 5,
   "receive_address": "TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw","
}'</span> <span class="token operator">|</span> jq <span class="token parameter variable">-c</span> <span class="token parameter variable">-S</span> <span class="token string">'.'</span><span class="token variable">)</span></span>

<span class="token assign-left variable">message</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${timestamp}</span>&amp;<span class="token variable">${data}</span>"</span>
<span class="token assign-left variable">signature</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${message}</span>"</span> <span class="token operator">|</span> openssl dgst <span class="token parameter variable">-sha256</span> <span class="token parameter variable">-hmac</span> $<span class="token punctuation">{</span>API_SECRET<span class="token punctuation">}</span> <span class="token parameter variable">-binary</span> <span class="token operator">|</span> xxd <span class="token parameter variable">-p</span><span class="token variable">)</span></span>

<span class="token function">curl</span> <span class="token parameter variable">--location</span> <span class="token parameter variable">--request</span> POST <span class="token variable">${URL}</span> <span class="token punctuation">\</span>
<span class="token parameter variable">--header</span> <span class="token string">"API-KEY: <span class="token variable">${API_KEY}</span>"</span> <span class="token punctuation">\</span>
<span class="token parameter variable">--header</span> <span class="token string">"TIMESTAMP: <span class="token variable">${timestamp}</span>"</span> <span class="token punctuation">\</span>
<span class="token parameter variable">--header</span> <span class="token string">"SIGNATURE: <span class="token variable">${signature}</span>"</span> <span class="token punctuation">\</span>
<span class="token parameter variable">--header</span> <span class="token string">"Content-Type: application/json"</span> <span class="token punctuation">\</span>
--data-raw <span class="token string">"<span class="token variable">${data}</span>"</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
</CodeGroup>
<h2 id="查询" tabindex="-1"><a class="header-anchor" href="#查询" aria-hidden="true">#</a> ==查询==</h2>
<h2 id="接口地址-1" tabindex="-1"><a class="header-anchor" href="#接口地址-1" aria-hidden="true">#</a> 接口地址</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>GET /api/v1/frontend/auto-delegate-policy?receive_address=
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="请求参数-1" tabindex="-1"><a class="header-anchor" href="#请求参数-1" aria-hidden="true">#</a> 请求参数</h2>
<table>
<thead>
<tr>
<th>参数名称</th>
<th>类型</th>
<th>必填</th>
<th>说明</th>
<th>示例</th>
</tr>
</thead>
<tbody>
<tr>
<td>receive_address</td>
<td>Tron地址</td>
<td>否</td>
<td>查询特定的地址，如果不填则返回所有</td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="返回参数-1" tabindex="-1"><a class="header-anchor" href="#返回参数-1" aria-hidden="true">#</a> 返回参数</h2>
<ul>
<li>正常返回示例</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"count"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token property">"code"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">"page"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">"next"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
    <span class="token property">"previous"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
    <span class="token property">"results"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">21</span><span class="token punctuation">,</span>
            <span class="token property">"receive_address"</span><span class="token operator">:</span> <span class="token string">"TNfdtE7p8pEfTTbfRb88gikf2tt5ENc86b"</span><span class="token punctuation">,</span>
            <span class="token property">"status"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">// 是否生效</span>
            <span class="token property">"last_step"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>   <span class="token comment">// 见下表解释</span>
            <span class="token property">"main_delegated"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>  <span class="token comment">// 委托状态，自动续期时有效</span>
            <span class="token property">"expired_time"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"create_time"</span><span class="token operator">:</span> <span class="token string">"2023-10-09T11:13:12.288373+08:00"</span><span class="token punctuation">,</span>
            <span class="token property">"update_time"</span><span class="token operator">:</span> <span class="token string">"2023-10-09T16:35:36.559760+08:00"</span><span class="token punctuation">,</span>
            <span class="token property">"last_step_display"</span><span class="token operator">:</span> <span class="token string">"\u59d4\u6258\u6210\u529f"</span><span class="token punctuation">,</span>
            <span class="token property">"status_display"</span><span class="token operator">:</span> <span class="token string">"\u542f\u7528"</span><span class="token punctuation">,</span>
            <span class="token property">"auto_type"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>       <span class="token comment">// 1为智能托管，2为仅自动续期</span>
            <span class="token property">"auto_type_display"</span><span class="token operator">:</span> <span class="token string">"\u5168\u81ea\u52a8\u6258\u7ba1"</span><span class="token punctuation">,</span>
            <span class="token property">"next_delegate_time"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>  <span class="token comment">// 自动续期时有效</span>
            <span class="token property">"max_energy"</span><span class="token operator">:</span> <span class="token number">50000</span><span class="token punctuation">,</span>  <span class="token comment">// 保持能量</span>
            <span class="token property">"period"</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>    <span class="token comment">//  委托周期    </span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        ...
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table>
<thead>
<tr>
<th>参数名称</th>
<th>类型</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>委托中</td>
</tr>
<tr>
<td>1</td>
<td>委托成功</td>
</tr>
<tr>
<td>2</td>
<td>解除委托</td>
</tr>
<tr>
<td>10</td>
<td>余额不足</td>
</tr>
<tr>
<td>20</td>
<td>能量不足</td>
</tr>
<tr>
<td>30</td>
<td>等待委托</td>
</tr>
</tbody>
</table>
<h2 id="修改状态" tabindex="-1"><a class="header-anchor" href="#修改状态" aria-hidden="true">#</a> ==修改状态==</h2>
<h2 id="接口地址-2" tabindex="-1"><a class="header-anchor" href="#接口地址-2" aria-hidden="true">#</a> 接口地址</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>POST /api/v1/frontend/auto-delegate-policy/{id}/change-status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="请求参数-2" tabindex="-1"><a class="header-anchor" href="#请求参数-2" aria-hidden="true">#</a> 请求参数</h2>
<table>
<thead>
<tr>
<th>参数名称</th>
<th>类型</th>
<th>必填</th>
<th>说明</th>
<th>示例</th>
</tr>
</thead>
<tbody>
<tr>
<td>status</td>
<td>int</td>
<td>是</td>
<td>1-启用， 0-关闭</td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="返回参数-2" tabindex="-1"><a class="header-anchor" href="#返回参数-2" aria-hidden="true">#</a> 返回参数</h2>
<ul>
<li>正常返回示例</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span><span class="token property">"errno"</span><span class="token operator">:</span><span class="token number">0</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


