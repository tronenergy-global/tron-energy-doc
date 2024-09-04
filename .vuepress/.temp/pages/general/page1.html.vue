<template><div><h1 id="关于签名" tabindex="-1"><a class="header-anchor" href="#关于签名" aria-hidden="true">#</a> 关于签名</h1>
<p>所有POST请求，必须签名后发送请求，GET请求无需签名，仅需要在Header中带入API-KEY即可</p>
<h2 id="post签名过程" tabindex="-1"><a class="header-anchor" href="#post签名过程" aria-hidden="true">#</a> POST签名过程</h2>
<p>首先，确保您已经获取到了<a href="/100-before">API</a>，如果还未获取API，请先注册获取，下面我们以下单接口为例，完整演示签名过程</p>
<ul>
<li><strong>准备</strong></li>
</ul>
<p>确定使用接口URL，这里演示使用下单接口</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>POST /api/v1/frontend/order
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>确定使用哪个API，这里演示使用</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code>API_KEY = <span class="token string">"B433BFF1CDE7450AA38A56BEAC690DD4"</span>
API_SECRET = <span class="token string">"0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>步骤 1</strong>: 确定下单参数
我们假设当前的参数为</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
   'energy_amount'<span class="token operator">:</span> <span class="token number">32000</span><span class="token punctuation">,</span> 
   'period'<span class="token operator">:</span> '1H'<span class="token punctuation">,</span>
   'receive_address'<span class="token operator">:</span> 'TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw'<span class="token punctuation">,</span>
   'callback_url'<span class="token operator">:</span> 'http<span class="token operator">:</span><span class="token comment">//{mydomain}/callback',</span>
   'out_trade_no'<span class="token operator">:</span> '<span class="token number">123456</span>'<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们需要将参数按key的字典顺序排序，转成字符串，得到</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>'{"callback_url":"http://{mydomain}/callback","energy_amount":32000,"out_trade_no":"123456","period":"1D","receive_address":"TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw"}'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>步骤 2</strong>: 添加时间戳
我们将当前的时间戳（精确到秒, 10位整数），添加到第一步得到参数之前，得到如下字符串</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>'1686796826&amp;{"callback_url":"http://{mydomain}/callback","energy_amount":32000,"out_trade_no":"123456","period":"1D","receive_address":"TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw"}'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>步骤 3</strong>: 使用API_SECRET加密
对步骤2的字符串用API_SECRET做sha256加密，得到</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>'07c125cabfe006614a02131f927cca9e7a654f7644a817b155fad591e1c50f7b'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<ul>
<li>测试时，您可以直接用文档中步骤2的结果加密，看是否和步骤3的结果一致</li>
</ul>
</div>
<ul>
<li><strong>步骤 4</strong>:  发送请求，将<code v-pre>API-KEY（和API_SECRET成对）</code>， <code v-pre>TIMESTAMP（同步骤2中的时间戳一致）</code>，<code v-pre>SIGNATURE(步骤3的结果)</code>添加到请求头</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code>  headers = <span class="token punctuation">{</span>
    <span class="token property">"API-KEY"</span><span class="token operator">:</span> <span class="token string">"B433BFF1CDE7450AA38A56BEAC690DD4"</span><span class="token punctuation">,</span>
    <span class="token property">"TIMESTAMP"</span><span class="token operator">:</span> <span class="token string">"1686796826"</span><span class="token punctuation">,</span>
    <span class="token property">"SIGNATURE"</span><span class="token operator">:</span> <span class="token string">"07c125cabfe006614a02131f927cca9e7a654f7644a817b155fad591e1c50f7b"</span><span class="token punctuation">,</span>
    <span class="token property">"Content-Type"</span><span class="token operator">:</span> <span class="token string">"application/json"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="代码示例" tabindex="-1"><a class="header-anchor" href="#代码示例" aria-hidden="true">#</a> 代码示例</h2>
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
URL <span class="token operator">=</span> <span class="token string">"https://itrx.io/api/v1/frontend/order"</span>
data <span class="token operator">=</span> <span class="token punctuation">{</span>
   <span class="token string">'energy_amount'</span><span class="token punctuation">:</span> <span class="token number">32000</span><span class="token punctuation">,</span>
   <span class="token string">'period'</span><span class="token punctuation">:</span> <span class="token string">'1D'</span><span class="token punctuation">,</span>
   <span class="token string">'receive_address'</span><span class="token punctuation">:</span> <span class="token string">'TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw'</span><span class="token punctuation">,</span>
   <span class="token string">'callback_url'</span><span class="token punctuation">:</span> <span class="token string">'http://{mydomain}/callback'</span><span class="token punctuation">,</span>
   <span class="token string">'out_trade_no'</span><span class="token punctuation">:</span> <span class="token string">'123456'</span><span class="token punctuation">,</span>
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




</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="Php">
<div class="language-php line-numbers-mode" data-ext="php"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token variable">$API_KEY</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"B433BFF1CDE7450AA38A56BEAC690DD4"</span><span class="token punctuation">;</span>
<span class="token variable">$API_SECRET</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8"</span><span class="token punctuation">;</span>

<span class="token variable">$timestamp</span> <span class="token operator">=</span> <span class="token function">time</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$data</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string single-quoted-string">'energy_amount'</span> <span class="token operator">=></span> <span class="token number">32000</span><span class="token punctuation">,</span>
    <span class="token string single-quoted-string">'period'</span> <span class="token operator">=></span> <span class="token string single-quoted-string">'1D'</span><span class="token punctuation">,</span>
    <span class="token string single-quoted-string">'receive_address'</span> <span class="token operator">=></span> <span class="token string single-quoted-string">'TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw'</span><span class="token punctuation">,</span>
    <span class="token string single-quoted-string">'callback_url'</span> <span class="token operator">=></span> <span class="token string single-quoted-string">'http://{mydomain}/callback'</span><span class="token punctuation">,</span>
    <span class="token string single-quoted-string">'out_trade_no'</span> <span class="token operator">=></span> <span class="token string single-quoted-string">'123456'</span><span class="token punctuation">,</span>
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
<span class="token variable">$result</span> <span class="token operator">=</span> <span class="token function">file_get_contents</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"https://itrx.io/api/v1/frontend/order"</span><span class="token punctuation">,</span> <span class="token constant boolean">false</span><span class="token punctuation">,</span> <span class="token variable">$context</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token variable">$result</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token delimiter important">?></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
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
        data<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"energy_amount"</span><span class="token punctuation">,</span> <span class="token number">32000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        data<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"period"</span><span class="token punctuation">,</span> <span class="token string">"1D"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        data<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"receive_address"</span><span class="token punctuation">,</span> <span class="token string">"TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        data<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"callback_url"</span><span class="token punctuation">,</span> <span class="token string">"http://{mydomain}/callback"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        data<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"out_trade_no"</span><span class="token punctuation">,</span> <span class="token string">"123456"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">// Sorting the keys</span>
        <span class="token class-name">TreeMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> sortedData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Gson</span> gson <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GsonBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">disableHtmlEscaping</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> json_data <span class="token operator">=</span> gson<span class="token punctuation">.</span><span class="token function">toJson</span><span class="token punctuation">(</span>sortedData<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">String</span> message <span class="token operator">=</span> timestamp <span class="token operator">+</span> <span class="token string">"&amp;"</span> <span class="token operator">+</span> json_data<span class="token punctuation">;</span>
        <span class="token class-name">String</span> signature <span class="token operator">=</span> <span class="token function">encodeHmacSHA256</span><span class="token punctuation">(</span>message<span class="token punctuation">,</span> <span class="token constant">API_SECRET</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">RequestBody</span> body <span class="token operator">=</span> <span class="token class-name">RequestBody</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>json_data<span class="token punctuation">,</span> mediaType<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Request</span> request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Request<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">url</span><span class="token punctuation">(</span><span class="token string">"https://itrx.io/api/v1/frontend/order"</span><span class="token punctuation">)</span>
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
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
	URL       <span class="token operator">=</span> <span class="token string">"https://itrx.io/api/v1/frontend/order"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Data <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	EnergyAmount   <span class="token builtin">int</span>    <span class="token string">`json:"energy_amount"`</span>
	Period         <span class="token builtin">string</span> <span class="token string">`json:"period"`</span>
	ReceiveAddress <span class="token builtin">string</span> <span class="token string">`json:"receive_address"`</span>
	CallbackURL    <span class="token builtin">string</span> <span class="token string">`json:"callback_url"`</span>
	OutTradeNo     <span class="token builtin">string</span> <span class="token string">`json:"out_trade_no"`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	timestamp <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">FormatInt</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Unix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>

	data <span class="token operator">:=</span> Data<span class="token punctuation">{</span>
		EnergyAmount<span class="token punctuation">:</span>   <span class="token number">32000</span><span class="token punctuation">,</span>
		Period<span class="token punctuation">:</span>         <span class="token string">"1D"</span><span class="token punctuation">,</span>
		ReceiveAddress<span class="token punctuation">:</span> <span class="token string">"TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw"</span><span class="token punctuation">,</span>
		CallbackURL<span class="token punctuation">:</span>    <span class="token string">"http://{mydomain}/callback"</span><span class="token punctuation">,</span>
		OutTradeNo<span class="token punctuation">:</span>     <span class="token string">"123456"</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	json <span class="token operator">:=</span> jsoniter<span class="token punctuation">.</span>ConfigCompatibleWithStandardLibrary
	b<span class="token punctuation">,</span> err <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="Shell">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token assign-left variable">API_KEY</span><span class="token operator">=</span><span class="token string">"B433BFF1CDE7450AA38A56BEAC690DD4"</span>
<span class="token assign-left variable">API_SECRET</span><span class="token operator">=</span><span class="token string">"0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8"</span>
<span class="token assign-left variable">URL</span><span class="token operator">=</span><span class="token string">"https://itrx.io/api/v1/frontend/order"</span>

<span class="token assign-left variable">timestamp</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%s<span class="token variable">)</span></span>

<span class="token assign-left variable">data</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> <span class="token string">'{
   "energy_amount": 32000,
   "period": "1D",
   "receive_address": "TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw",
   "callback_url": "http://{mydomain}/callback",
   "out_trade_no": "123456"
}'</span> <span class="token operator">|</span> jq <span class="token parameter variable">-c</span> <span class="token parameter variable">-S</span> <span class="token string">'.'</span><span class="token variable">)</span></span>

<span class="token assign-left variable">message</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${timestamp}</span>&amp;<span class="token variable">${data}</span>"</span>
<span class="token assign-left variable">signature</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${message}</span>"</span> <span class="token operator">|</span> openssl dgst <span class="token parameter variable">-sha256</span> <span class="token parameter variable">-hmac</span> $<span class="token punctuation">{</span>API_SECRET<span class="token punctuation">}</span> <span class="token parameter variable">-binary</span> <span class="token operator">|</span> xxd <span class="token parameter variable">-p</span><span class="token variable">)</span></span>

<span class="token function">curl</span> <span class="token parameter variable">--location</span> <span class="token parameter variable">--request</span> POST <span class="token variable">${URL}</span> <span class="token punctuation">\</span>
<span class="token parameter variable">--header</span> <span class="token string">"API-KEY: <span class="token variable">${API_KEY}</span>"</span> <span class="token punctuation">\</span>
<span class="token parameter variable">--header</span> <span class="token string">"TIMESTAMP: <span class="token variable">${timestamp}</span>"</span> <span class="token punctuation">\</span>
<span class="token parameter variable">--header</span> <span class="token string">"SIGNATURE: <span class="token variable">${signature}</span>"</span> <span class="token punctuation">\</span>
<span class="token parameter variable">--header</span> <span class="token string">"Content-Type: application/json"</span> <span class="token punctuation">\</span>
--data-raw <span class="token string">"<span class="token variable">${data}</span>"</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
</CodeGroup></div></template>


