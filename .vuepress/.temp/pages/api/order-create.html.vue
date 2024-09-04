<template><div><h1 id="place-an-order" tabindex="-1"><a class="header-anchor" href="#place-an-order" aria-hidden="true">#</a> Place an order</h1>
<h2 id="interface-address" tabindex="-1"><a class="header-anchor" href="#interface-address" aria-hidden="true">#</a> interface address</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>POST /api/v1/frontend/order
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="request-parameters" tabindex="-1"><a class="header-anchor" href="#request-parameters" aria-hidden="true">#</a> Request parameters</h2>
<table>
<thead>
<tr>
<th>Parameter name</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td>energy_amount</td>
<td>int</td>
<td>yes</td>
<td>energy required</td>
<td>32000</td>
</tr>
<tr>
<td>period</td>
<td>string</td>
<td>Yes</td>
<td>Rental period, 1H/1D/3D/30D<br/>H means 1 hour, D means day</td>
<td>1H</td>
</tr>
<tr>
<td>receive_address</td>
<td>Tron address</td>
<td>Yes</td>
<td>The address needs to be activated, otherwise the order will fail</td>
<td></td>
</tr>
<tr>
<td>callback_url</td>
<td>string</td>
<td>No</td>
<td>A notification will be sent to this address if the delegation is successful</td>
<td>https://mydomain.com/callback</td>
</tr>
<tr>
<td>out_trade_no</td>
<td>string</td>
<td>No</td>
<td>This information will be brought during the callback to facilitate the receiver to associate orders</td>
<td>S202302320004</td>
</tr>
</tbody>
</table>
<h2 id="return-parameters" tabindex="-1"><a class="header-anchor" href="#return-parameters" aria-hidden="true">#</a> Return parameters</h2>
<ul>
<li>Normal return example</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
     <span class="token property">"errno"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
     <span class="token property">"serial"</span><span class="token operator">:</span> <span class="token string">"7297a8a2a9e39b86fc5bad0d2e9edda2"</span><span class="token punctuation">,</span>
     <span class="token property">"amount"</span><span class="token operator">:</span> <span class="token number">3120000</span><span class="token punctuation">,</span>
     <span class="token property">"balance"</span><span class="token operator">:</span> <span class="token number">813900029257</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>For exception returns, please refer to <RouterLink to="/general/error-code.html">API return value</RouterLink></p>
</li>
<li>
<p>Field explanation</p>
</li>
</ul>
<table>
<thead>
<tr>
<th>Parameter name</th>
<th>Type</th>
<th>Description</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td>errno</td>
<td>int</td>
<td>Error code, normal when it is 0</td>
<td></td>
</tr>
<tr>
<td>message</td>
<td>string</td>
<td>Error reason, if errno &gt; 0</td>
<td></td>
</tr>
<tr>
<td>serial</td>
<td>string</td>
<td>internal order number</td>
<td></td>
</tr>
<tr>
<td>amount</td>
<td>int</td>
<td>Order cost，in sun</td>
<td></td>
</tr>
<tr>
<td>balance</td>
<td>int</td>
<td>Balance, in sun, needs to be divided by 1000000 to convert to TRX</td>
<td></td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<ul>
<li>In order to check the completion status of the order after placing the order, you can use <RouterLink to="/en/api/order-query.html">active query</RouterLink> or <RouterLink to="/en/general/callback.html">passive callback</RouterLink></li>
</ul>
</div>
<h2 id="code-example" tabindex="-1"><a class="header-anchor" href="#code-example" aria-hidden="true">#</a> Code Example</h2>
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
URL <span class="token operator">=</span> <span class="token string">"https://{domain}/api/v1/frontend/order"</span>
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

<span class="token variable">$ch</span> <span class="token operator">=</span> <span class="token function">curl_init</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"https://{domain}/api/v1/frontend/order"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">curl_setopt</span><span class="token punctuation">(</span><span class="token variable">$ch</span><span class="token punctuation">,</span> <span class="token constant">CURLOPT_CUSTOMREQUEST</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"POST"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">curl_setopt</span><span class="token punctuation">(</span><span class="token variable">$ch</span><span class="token punctuation">,</span> <span class="token constant">CURLOPT_POSTFIELDS</span><span class="token punctuation">,</span> <span class="token variable">$json_data</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">curl_setopt</span><span class="token punctuation">(</span><span class="token variable">$ch</span><span class="token punctuation">,</span> <span class="token constant">CURLOPT_RETURNTRANSFER</span><span class="token punctuation">,</span> <span class="token constant boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">curl_setopt</span><span class="token punctuation">(</span><span class="token variable">$ch</span><span class="token punctuation">,</span> <span class="token constant">CURLOPT_HTTPHEADER</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
    <span class="token string double-quoted-string">"Content-Type: application/json"</span><span class="token punctuation">,</span>
    <span class="token string double-quoted-string">"API-KEY: <span class="token interpolation"><span class="token variable">$API_KEY</span></span>"</span><span class="token punctuation">,</span>
    <span class="token string double-quoted-string">"TIMESTAMP: <span class="token interpolation"><span class="token variable">$timestamp</span></span>"</span><span class="token punctuation">,</span>
    <span class="token string double-quoted-string">"SIGNATURE: <span class="token interpolation"><span class="token variable">$signature</span></span>"</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$result</span> <span class="token operator">=</span> <span class="token function">curl_exec</span><span class="token punctuation">(</span><span class="token variable">$ch</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">curl_close</span><span class="token punctuation">(</span><span class="token variable">$ch</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token variable">$result</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token delimiter important">?></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
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
                <span class="token punctuation">.</span><span class="token function">url</span><span class="token punctuation">(</span><span class="token string">"https://{domain}/api/v1/frontend/order"</span><span class="token punctuation">)</span>
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
	URL       <span class="token operator">=</span> <span class="token string">"https://{domain}/api/v1/frontend/order"</span>
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

	ordered_data <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span>
		<span class="token string">"energy_amount"</span><span class="token punctuation">:</span>        data<span class="token punctuation">.</span>EnergyAmount<span class="token punctuation">,</span>
		<span class="token string">"period"</span><span class="token punctuation">:</span>               data<span class="token punctuation">.</span>Period<span class="token punctuation">,</span>
		<span class="token string">"receive_address"</span><span class="token punctuation">:</span>      data<span class="token punctuation">.</span>ReceiveAddress<span class="token punctuation">,</span>
    <span class="token string">"callback_url"</span><span class="token punctuation">:</span>         data<span class="token punctuation">.</span>CallbackURL<span class="token punctuation">,</span>
    <span class="token string">"out_trade_no"</span><span class="token punctuation">:</span>         data<span class="token punctuation">.</span>OutTradeNo<span class="token punctuation">,</span>
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="Shell">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token assign-left variable">API_KEY</span><span class="token operator">=</span><span class="token string">"B433BFF1CDE7450AA38A56BEAC690DD4"</span>
<span class="token assign-left variable">API_SECRET</span><span class="token operator">=</span><span class="token string">"0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8"</span>
<span class="token assign-left variable">URL</span><span class="token operator">=</span><span class="token string">"https://{domain}/api/v1/frontend/order"</span>

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
  <CodeGroupItem title="Node">
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> crypto <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'crypto'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> axios <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'axios'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token constant">API_KEY</span> <span class="token operator">=</span> <span class="token string">"B433BFF1CDE7450AA38A56BEAC690DD4"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token constant">API_SECRET</span> <span class="token operator">=</span> <span class="token string">"0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> timestamp <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token constant">URL</span> <span class="token operator">=</span> <span class="token string">"https://{domain}/api/v1/frontend/order"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">energy_amount</span><span class="token operator">:</span> <span class="token number">32000</span><span class="token punctuation">,</span>
    <span class="token literal-property property">period</span><span class="token operator">:</span> <span class="token string">'1D'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">receive_address</span><span class="token operator">:</span> <span class="token string">'TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">callback_url</span><span class="token operator">:</span> <span class="token string">'http://{mydomain}/callback'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">out_trade_no</span><span class="token operator">:</span> <span class="token string">'123456'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> json_data <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> message <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>timestamp<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&amp;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>json_data<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
<span class="token keyword">const</span> signature <span class="token operator">=</span> crypto<span class="token punctuation">.</span><span class="token function">createHmac</span><span class="token punctuation">(</span><span class="token string">'sha256'</span><span class="token punctuation">,</span> <span class="token constant">API_SECRET</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">digest</span><span class="token punctuation">(</span><span class="token string">'hex'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> headers <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string-property property">"API-KEY"</span><span class="token operator">:</span> <span class="token constant">API_KEY</span><span class="token punctuation">,</span>
    <span class="token string-property property">"TIMESTAMP"</span><span class="token operator">:</span> timestamp<span class="token punctuation">,</span>
    <span class="token string-property property">"SIGNATURE"</span><span class="token operator">:</span> signature<span class="token punctuation">,</span>
    <span class="token string-property property">'Content-Type'</span><span class="token operator">:</span> <span class="token string">'application/json'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token constant">URL</span><span class="token punctuation">,</span> json_data<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">headers</span><span class="token operator">:</span> headers <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">response</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">error</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"Error:"</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
</CodeGroup></div></template>


