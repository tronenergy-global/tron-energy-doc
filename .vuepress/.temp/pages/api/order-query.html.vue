<template><div><h1 id="order-query-single" tabindex="-1"><a class="header-anchor" href="#order-query-single" aria-hidden="true">#</a> Order query (single)</h1>
<h2 id="interface-address" tabindex="-1"><a class="header-anchor" href="#interface-address" aria-hidden="true">#</a> interface address</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>GET /api/v1/frontend/order/query?serial={serial_no}
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
<td>serial</td>
<td>string</td>
<td>Yes</td>
<td>The order number returned when placing an order</td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="return-parameters" tabindex="-1"><a class="header-anchor" href="#return-parameters" aria-hidden="true">#</a> Return parameters</h2>
<ul>
<li>Normal return example</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
     <span class="token property">"errno"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
     <span class="token property">"receive_address"</span><span class="token operator">:</span> <span class="token string">"TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw"</span><span class="token punctuation">,</span>
     <span class="token property">"order_no"</span><span class="token operator">:</span> <span class="token string">"58b451473d290f92443eabf0322b9907"</span><span class="token punctuation">,</span>
     <span class="token property">"energy_amount"</span><span class="token operator">:</span> <span class="token number">32000</span><span class="token punctuation">,</span>
     <span class="token property">"pay_amount"</span><span class="token operator">:</span> <span class="token number">0.0</span><span class="token punctuation">,</span>
     <span class="token property">"amount"</span><span class="token operator">:</span> <span class="token number">3800000</span><span class="token punctuation">,</span>
     <span class="token property">"details"</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token comment">// Large orders may be split into multiple orders</span>
         <span class="token punctuation">{</span>
             <span class="token property">"delegate_hash"</span><span class="token operator">:</span> <span class="token string">"e2e71df638a9e01492a50bebba072a39eb75f673e91d5374ccf517f44e113f3"</span><span class="token punctuation">,</span>
             <span class="token property">"delegate_time"</span><span class="token operator">:</span> <span class="token string">"2023-10-09T10:21:07.840478Z"</span><span class="token punctuation">,</span>
             <span class="token property">"reclaim_hash"</span><span class="token operator">:</span> <span class="token string">"f4672a9563947cf78e5534b4025451dfd75efa5481a67b20ee55b9be368c900"</span><span class="token punctuation">,</span>
             <span class="token property">"reclaim_time"</span><span class="token operator">:</span> <span class="token string">"2023-10-12T10:21:07.840478Z"</span><span class="token punctuation">,</span>
             <span class="token property">"reclaim_time_real"</span><span class="token operator">:</span> <span class="token string">"2023-10-09T10:26:12.617456Z"</span><span class="token punctuation">,</span>
             <span class="token property">"status"</span><span class="token operator">:</span> <span class="token number">30</span> <span class="token comment">// 20-in commission, 30-recycled</span>
         <span class="token punctuation">}</span>
     <span class="token punctuation">]</span><span class="token punctuation">,</span>
     <span class="token property">"create_time"</span><span class="token operator">:</span> <span class="token string">"2023-06-15T21:42:13.200565+08:00"</span><span class="token punctuation">,</span>
     <span class="token property">"api_name"</span><span class="token operator">:</span> <span class="token string">"MY API"</span><span class="token punctuation">,</span>
     <span class="token property">"period"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
     <span class="token property">"status"</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token comment">// 30 indicates that the commission was completely successful</span>
     <span class="token property">"refund_amount"</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>-Exception return</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
     <span class="token property">"errno"</span><span class="token operator">:</span> <span class="token number">404</span><span class="token punctuation">,</span>
     <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"Order not found"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Field explanation</li>
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
<td>receive_address</td>
<td>string</td>
<td>The address to place an order to receive energy</td>
<td></td>
</tr>
<tr>
<td>order_no</td>
<td>string</td>
<td>order number, same as serial</td>
<td></td>
</tr>
<tr>
<td>energy_amount</td>
<td>int</td>
<td>The energy of placing the order</td>
<td></td>
</tr>
<tr>
<td>pay_amount</td>
<td>float</td>
<td>Delegated energy</td>
<td></td>
</tr>
<tr>
<td>amount</td>
<td>int</td>
<td>TRX paid, unit sun</td>
<td></td>
</tr>
<tr>
<td>create_time</td>
<td>string</td>
<td>order time</td>
<td></td>
</tr>
<tr>
<td>api_name</td>
<td>string</td>
<td>Distinguish which API placed the order</td>
<td></td>
</tr>
<tr>
<td>period</td>
<td>int</td>
<td>Rental duration, currently supports <br/>0 (1 hour), 1 (1 day), <br/>3 (3 days), 30 (30 days)</td>
<td></td>
</tr>
<tr>
<td>status</td>
<td>int</td>
<td>Order status<br/>(0, 'Timeout closed'),<br/>(10, 'Waiting for payment'),<br/>(20, 'Paid'),<br/> (30, 'Delegation in preparation'),<br/>(31, 'Partial commission'),<br/>(32, 'Exception retrying'),<br/>(40, 'Normal completion') ,<br/>(41, 'Refund termination'),<br/>(43, 'Abnormal termination'),</td>
<td></td>
</tr>
<tr>
<td>refund_amount</td>
<td>int</td>
<td>Refund amount, unit sun</td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="code-example" tabindex="-1"><a class="header-anchor" href="#code-example" aria-hidden="true">#</a> Code Example</h2>
<CodeGroup>
  <CodeGroupItem title="Python" active>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">import</span> requests

API_KEY <span class="token operator">=</span> <span class="token string">"B433BFF1CDE7450AA38A56BEAC690DD4"</span>
URL <span class="token operator">=</span> <span class="token string">"https://{domain}/api/v1/frontend/order/query"</span>
params <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">'serial'</span><span class="token punctuation">:</span> <span class="token string">'58b451473d290f92443eabf0322b9907'</span><span class="token punctuation">}</span>
headers <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">"API-KEY"</span><span class="token punctuation">:</span> API_KEY
<span class="token punctuation">}</span>
response <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>URL<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">,</span> params<span class="token operator">=</span>params<span class="token punctuation">,</span> headers<span class="token operator">=</span>headers<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="Php">
<div class="language-php line-numbers-mode" data-ext="php"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token variable">$API_KEY</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"B433BFF1CDE7450AA38A56BEAC690DD4"</span><span class="token punctuation">;</span>
<span class="token variable">$URL</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"https://{domain}/api/v1/frontend/order/query"</span><span class="token punctuation">;</span>
<span class="token variable">$params</span> <span class="token operator">=</span> <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'serial'</span> <span class="token operator">=></span> <span class="token string single-quoted-string">'58b451473d290f92443eabf0322b9907'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$headers</span> <span class="token operator">=</span> <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'API-KEY'</span> <span class="token operator">=></span> <span class="token variable">$API_KEY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$context</span> <span class="token operator">=</span> <span class="token function">stream_context_create</span><span class="token punctuation">(</span><span class="token keyword">array</span><span class="token punctuation">(</span>
    <span class="token string single-quoted-string">'http'</span> <span class="token operator">=></span> <span class="token keyword">array</span><span class="token punctuation">(</span>
        <span class="token string single-quoted-string">'method'</span> <span class="token operator">=></span> <span class="token string single-quoted-string">'GET'</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">'header'</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"API-KEY: "</span> <span class="token operator">.</span> <span class="token variable">$API_KEY</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$response</span> <span class="token operator">=</span> <span class="token function">file_get_contents</span><span class="token punctuation">(</span><span class="token variable">$URL</span> <span class="token operator">.</span> <span class="token string double-quoted-string">"?"</span> <span class="token operator">.</span> <span class="token function">http_build_query</span><span class="token punctuation">(</span><span class="token variable">$params</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant boolean">false</span><span class="token punctuation">,</span> <span class="token variable">$context</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token function">json_decode</span><span class="token punctuation">(</span><span class="token variable">$response</span><span class="token punctuation">,</span> <span class="token constant boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token delimiter important">?></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="Java">
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">okhttp3<span class="token punctuation">.</span></span><span class="token class-name">OkHttpClient</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">okhttp3<span class="token punctuation">.</span></span><span class="token class-name">Request</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">okhttp3<span class="token punctuation">.</span></span><span class="token class-name">Response</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">OkHttpClient</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OkHttpClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> url <span class="token operator">=</span> <span class="token string">"https://{domain}/api/v1/frontend/order/query?serial=58b451473d290f92443eabf0322b9907"</span><span class="token punctuation">;</span>
        <span class="token class-name">Request</span> request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Request<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">url</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">addHeader</span><span class="token punctuation">(</span><span class="token string">"API-KEY"</span><span class="token punctuation">,</span> <span class="token string">"B433BFF1CDE7450AA38A56BEAC690DD4"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Response</span> response <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">newCall</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="Go">
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"io/ioutil"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	API_KEY <span class="token operator">:=</span> <span class="token string">"B433BFF1CDE7450AA38A56BEAC690DD4"</span>
	URL <span class="token operator">:=</span> <span class="token string">"https://{domain}/api/v1/frontend/order/query?serial=58b451473d290f92443eabf0322b9907"</span>

	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span><span class="token punctuation">}</span>
	req<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequest</span><span class="token punctuation">(</span><span class="token string">"GET"</span><span class="token punctuation">,</span> URL<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"API-KEY"</span><span class="token punctuation">,</span> API_KEY<span class="token punctuation">)</span>

	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The HTTP request failed with error %s\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		data<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> ioutil<span class="token punctuation">.</span><span class="token function">ReadAll</span><span class="token punctuation">(</span>resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="Shell">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token assign-left variable">API_KEY</span><span class="token operator">=</span><span class="token string">"B433BFF1CDE7450AA38A56BEAC690DD4"</span>
<span class="token assign-left variable">URL</span><span class="token operator">=</span><span class="token string">"https://{domain}/api/v1/frontend/order/query"</span>
<span class="token assign-left variable">params</span><span class="token operator">=</span><span class="token string">"serial=58b451473d290f92443eabf0322b9907"</span>

<span class="token function">curl</span> <span class="token parameter variable">-X</span> GET <span class="token parameter variable">-H</span> <span class="token string">"API-KEY:<span class="token variable">$API_KEY</span>"</span> <span class="token string">"<span class="token variable">$URL</span>?<span class="token variable">$params</span>"</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
</CodeGroup></div></template>


